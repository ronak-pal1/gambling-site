import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { TransactionModel } from "../../models/transactions.model";
import mongoose from "mongoose";

export const transactions = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.query.id as string;

    if (!userId)
      return res.status(400).json({ message: "User id is not given" });

    try {
      const transactions = await TransactionModel.aggregate([
        {
          $match: { userId: new mongoose.Types.ObjectId(userId) }, // Filter transactions for the specific user
        },
        {
          $lookup: {
            from: "events", // The MongoDB collection name of EventModel
            localField: "eventId", // The field in TransactionModel
            foreignField: "_id", // The field in EventModel that matches
            as: "eventDetails", // The name of the new field that will contain event data
          },
        },
        {
          $unwind: "$eventDetails", // Convert eventDetails array into an object
        },
        {
          $project: {
            _id: 1,
            userId: 1,
            amount: 1, // Include transaction details
            eventId: 1,
            eventName: "$eventDetails.sportName", // Extract event name
            createdAt: 1,
            type: 1,
            team: 1,
            status: 1,
            odds: 1,
          },
        },
      ]);

      res
        .status(200)
        .json({ message: "User transactions are fetched", transactions });
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Error in getting the user transactions" });
    }
  }
);
