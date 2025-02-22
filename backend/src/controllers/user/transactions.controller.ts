import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { TransactionModel } from "../../models/transactions.model";

export const transactions = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user;

    try {
      const transactions = await TransactionModel.find({
        userId: user._id,
      });

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
