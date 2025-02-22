import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { TransactionModel } from "../../models/transactions.model";

export const transactions = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.query.id;

    if (!userId)
      return res.status(400).json({ message: "User id is not given" });

    try {
      const transactions = await TransactionModel.find({
        userId,
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
