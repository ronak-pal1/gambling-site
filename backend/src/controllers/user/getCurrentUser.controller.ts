import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { UserModel } from "../../models/user.model";

export const getCurrentUser = asyncHandler(
  async (req: Request, res: Response) => {
    const userInstance = req.user;

    try {
      const user = await UserModel.aggregate([
        {
          $match: { _id: userInstance._id }, // Filter by the specific user ID
        },
        {
          $lookup: {
            from: "transactions", // Collection name of TransactionModel
            localField: "_id", // User's ID in UserModel
            foreignField: "userId", // Matching field in TransactionModel
            as: "transactions", // The new field with transactions
          },
        },
        {
          $project: {
            _id: 1,
            name: 1, // Include user's name
            email: 1, // Include email
            balance: "$coinBalance", // Include coin balance
            totalBetAmount: {
              $sum: {
                $map: {
                  input: {
                    $filter: {
                      input: "$transactions", // Iterate over transactions
                      as: "t",
                      cond: { $eq: ["$$t.status", "Matched"] }, // Only include "Matched" transactions
                    },
                  },
                  as: "matchedTransaction",
                  in: "$$matchedTransaction.amount", // Sum the amount field
                },
              },
            },
          },
        },
      ]);

      res.status(200).json({
        message: "User details fetched",
        user: user[0],
      });
    } catch (e) {
      res
        .status(500)
        .json({ message: "An error occurred while fetching user details" });
    }
  }
);
