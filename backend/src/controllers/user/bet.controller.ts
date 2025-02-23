import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { AlertModel } from "../../models/alerts.model";
import {
  TRANSAC_TYPE,
  TransactionModel,
} from "../../models/transactions.model";
import { EventModel } from "../../models/event.model";
import { UserModel } from "../../models/user.model";

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
    const newAlert = new AlertModel({
      by: user._id,
      eventId,
      endTime,
      amount,
      odds,
      team,
      status: "Pending",
    });

    await newAlert.save();

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

  try {
    const alert = await AlertModel.findOne({
      _id: alertId,
    });

    if (!alert) {
      res.status(400).json({ message: "Invalid alert" });
      return;
    }

    await AlertModel.updateOne(
      {
        _id: alertId,
      },
      {
        $set: {
          acceptedBy: user._id,
          status: "Matched",
        },
      }
    );

    const newTransaction = new TransactionModel({
      userId: user._id,
      odds: alert.odds,
      amount,
      team: alert.team,
      status: "Matched",
      eventId: alert.eventId,
      type: TRANSAC_TYPE.bet,
    });

    await newTransaction.save();

    await EventModel.updateOne(
      { _id: alert.eventId },
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

    res.status(200).json({ message: "Bet is accepted successfully" });
  } catch (e) {
    return res.status(500).json({ message: "Error in accepting the bet" });
  }
});
