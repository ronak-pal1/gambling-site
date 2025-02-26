import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { EventModel } from "../../models/event.model";
import { TransactionModel } from "../../models/transactions.model";
import { UserModel } from "../../models/user.model";

export const modifyEvent = asyncHandler(async (req: Request, res: Response) => {
  const eventId = req.body.eventId;
  const changedInfo = req.body.changedInfo;

  if (!eventId) {
    return res.status(400).json({ message: "Event id is not given" });
  }

  try {
    await EventModel.updateOne(
      {
        _id: eventId,
      },
      {
        $set: changedInfo,
      }
    );

    if (changedInfo.winningTeam) {
      const event = await EventModel.findById({
        _id: eventId,
      }).select({
        team1: 1,
        team2: 1,
      });

      let winningteamName = event?.team1.teamName;
      let oppositeTeamName = event?.team2.teamName;

      if (changedInfo.winningTeam == "team2") {
        winningteamName = event?.team2.teamName;
        oppositeTeamName = event?.team1.teamName;
      }

      console.log(winningteamName, oppositeTeamName);
      if (winningteamName && oppositeTeamName)
        await distributeWinnings(winningteamName, oppositeTeamName);
    }

    res.status(200).json({
      message: "Event is modified successfully",
    });
  } catch (e) {
    return res.status(500).json({ message: "Error while modifying event" });
  }
});

const distributeWinnings = async (winningTeam: string, offsiteTeam: string) => {
  try {
    // Step 1: Revert previous winnings if a different team wins
    const previousWinners = await TransactionModel.aggregate([
      {
        $match: {
          team: offsiteTeam, // Find transactions for the losing team
          status: "Matched",
          type: "bet",
          isSettled: true, // Only revert if already settled
        },
      },
      {
        $group: {
          _id: "$userId", // Group by user
          totalAmount: { $sum: { $multiply: ["$amount", "$odds"] } }, // Calculate total credited amount
          transactions: { $push: "$_id" }, // Store transaction IDs to revert settlement
        },
      },
    ]);

    if (previousWinners.length > 0) {
      // Step 2: Bulk revert user balances
      const revertUserOps = previousWinners.map((win) => ({
        updateOne: {
          filter: { _id: win._id },
          update: { $inc: { coinBalance: -win.totalAmount } }, // Revert previous credits
        },
      }));

      // Step 3: Mark reverted transactions as unsettled
      const revertTransactionOps = previousWinners.flatMap((win) =>
        win.transactions.map((txnId: string) => ({
          updateOne: {
            filter: { _id: txnId },
            update: { $set: { isSettled: false } }, // Undo settlement
          },
        }))
      );

      // Execute reversion
      await UserModel.bulkWrite(revertUserOps);
      await TransactionModel.bulkWrite(revertTransactionOps);

      console.log(`Reverted winnings for ${previousWinners.length} users.`);
    }

    // Step 1: Aggregate total winnings per user
    const winnings = await TransactionModel.aggregate([
      {
        $match: {
          team: winningTeam,
          type: "bet",
          status: "Matched",
          $or: [
            { isSettled: false }, // If field exists, it should be false
            { isSettled: { $exists: false } }, // If field does not exist, include it
          ],
        },
      },
      {
        $group: {
          _id: "$userId", // Group by user
          totalAmount: { $sum: { $multiply: ["$amount", "$odds"] } }, // amount * odds
          transactions: { $push: "$_id" }, // Store transaction IDs for updating isSettled
        },
      },
    ]);

    if (winnings.length === 0) {
      console.log("No unsettled winnings to distribute.");
      return;
    }

    // Step 2: Create bulk update operations for Users
    const userBulkOps = winnings.map((win) => ({
      updateOne: {
        filter: { _id: win._id }, // Find the user
        update: { $inc: { coinBalance: win.totalAmount } }, // Increase balance by amount * odds
      },
    }));

    // Step 3: Create bulk update operations for Transactions (set isSettled: true)
    const transactionBulkOps = winnings.flatMap((win) =>
      win.transactions.map((txnId: string) => ({
        updateOne: {
          filter: { _id: txnId },
          update: { $set: { isSettled: true } }, // Mark transaction as settled
        },
      }))
    );

    // Step 4: Execute bulk updates
    await UserModel.bulkWrite(userBulkOps);
    await TransactionModel.bulkWrite(transactionBulkOps);

    console.log(
      `Successfully updated ${winnings.length} users with their winnings.`
    );
  } catch (error) {
    console.error("Error updating user balances:", error);
  }
};

export const deleteEvent = asyncHandler(async (req: Request, res: Response) => {
  const eventId = req.body.eventId;

  if (!eventId) {
    return res.status(400).json({ message: "Event id is not given" });
  }

  try {
    await EventModel.deleteOne({
      _id: eventId,
    });

    res.status(200).json({ message: "The event is deleted successfully" });
  } catch (e) {
    return res.status(500).json({ message: "Error in deleting the event" });
  }
});
