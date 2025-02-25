import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { AlertModel } from "../../models/alerts.model";
import {
  TRANSAC_TYPE,
  TransactionModel,
} from "../../models/transactions.model";
import { EventModel } from "../../models/event.model";
import { UserModel } from "../../models/user.model";
import mongoose from "mongoose";

export const initiateBet = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  const eventId = req.body.eventId;
  const endTime = req.body.endTime;
  const amount = req.body.amount;
  const odds = req.body.odds;
  const team = req.body.team;

  if (amount > user.coinBalance)
    return res.status(400).json({ message: "Amount is crossing your balance" });

  if (!eventId || !endTime || !amount || !odds)
    return res
      .status(400)
      .json({ message: "Betting details are not provided" });

  try {
    const newTransaction = new TransactionModel({
      userId: user._id,
      odds,
      amount,
      status: "Pending",
      eventId,
      team,
      type: TRANSAC_TYPE.bet,
    });

    await newTransaction.save();

    const newAlert = new AlertModel({
      by: user._id,
      eventId,
      endTime,
      amount,
      odds,
      team,
      previousTransactionId: newTransaction._id,
      status: "Pending",
    });

    await newAlert.save();

    await EventModel.updateOne(
      { _id: eventId },
      {
        $inc: { prizePool: amount },
      }
    );

    await UserModel.updateOne(
      {
        _id: user._id,
      },
      {
        $set: {
          coinBalance: user.coinBalance - amount,
        },
      }
    );

    res.status(200).json({ message: "Bet is initiatted successfully" });
  } catch (e) {
    return res.status(500).json({ message: "Error in initiating the bet" });
  }
});

export const acceptBet = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  const alertId = req.body.alertId;
  const amount = req.body.amount;
  const endTime = req.body.endTime;

  if (user.coinBalance < amount) {
    return res.status(400).json({ message: "Amount exceded" });
  }

  try {
    const alertArr = await AlertModel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(alertId) }, // Find the specific alert
      },
      {
        $lookup: {
          from: "events", // Collection name for EventModel
          localField: "eventId", // Field in AlertModel
          foreignField: "_id", // Field in EventModel
          as: "eventData",
        },
      },
      {
        $unwind: "$eventData", // Convert eventData array to an object
      },
      {
        $project: {
          _id: 1,
          eventId: 1,
          "eventData.team1": 1,
          "eventData.team2": 1,
          odds: 1,
          team: 1,
          amount: 1,
          previousTransactionId: 1,
          by: 1,
          status: 1,
        },
      },
    ]);

    const alert = alertArr[0];

    if (!alert) {
      res.status(400).json({ message: "Invalid alert" });
      return;
    }

    if (alert.status == "Matched") {
      return res.status(400).json({ message: "Bet is alrady matched" });
    }

    if (amount == 0 || alert.amount == 0)
      return res.status(400).json({ message: "Bets can't be 0" });

    const oppositeTeam =
      alert.eventData.team1.teamName == alert.team
        ? alert.eventData.team2
        : alert.eventData.team1;

    console.log(oppositeTeam);

    let remainingAmount =
      (alert.amount * alert.odds - amount * oppositeTeam.odds) / alert.odds;

    if (amount * oppositeTeam.odds > alert.amount * alert.odds)
      remainingAmount = 0;

    await AlertModel.updateOne(
      {
        _id: alertId,
      },
      {
        $set: {
          acceptedBy: user._id,
          amount: remainingAmount,

          status:
            alert.amount * alert.odds <= amount * oppositeTeam.odds
              ? "Matched"
              : "Partial",
        },
      }
    );

    const newTransaction = new TransactionModel({
      userId: user._id,
      odds: oppositeTeam.odds,
      amount:
        amount * oppositeTeam.odds > alert.amount * alert.odds
          ? (alert.amount * alert.odds) / oppositeTeam.odds
          : amount,
      team: oppositeTeam.teamName,
      status: "Matched",
      eventId: alert.eventId,
      type: TRANSAC_TYPE.bet,
    });

    await newTransaction.save();

    if (alert.amount * alert.odds <= amount * oppositeTeam.odds) {
      await TransactionModel.updateOne(
        {
          _id: alert.previousTransactionId,
        },
        {
          $set: {
            status: "Matched",
          },
        }
      );
    }

    await EventModel.updateOne(
      { _id: alert.eventId },
      {
        $inc: {
          prizePool:
            amount * oppositeTeam.odds > alert.amount * alert.odds
              ? alert.amount
              : amount,
        },
      }
    );

    await UserModel.updateOne(
      {
        _id: user._id,
      },
      {
        $set: {
          coinBalance: user.coinBalance - amount,
        },
      }
    );

    // for creating another alert if the accepting bet user given big amount then the generating alert user
    if (amount * oppositeTeam.odds > alert.amount * alert.odds) {
      const partialAmountForOppositeTeam =
        amount - (alert.odds * alert.amount) / oppositeTeam.odds;

      const partialNewTransaction = new TransactionModel({
        userId: user._id,
        odds: oppositeTeam.odds,
        amount: partialAmountForOppositeTeam,
        status: "Pending",
        eventId: alert.eventId,
        team: oppositeTeam.teamName,
        type: TRANSAC_TYPE.bet,
      });

      await partialNewTransaction.save();

      const partialAlert = new AlertModel({
        by: user._id,
        eventId: alert.eventId,
        endTime,
        amount: partialAmountForOppositeTeam,
        odds: oppositeTeam.odds,
        team: oppositeTeam.teamName,
        previousTransactionId: partialNewTransaction._id,
        status: "Pending",
      });

      await partialAlert.save();
    }

    res.status(200).json({ message: "Bet is accepted successfully" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Error in accepting the bet" });
  }
});
