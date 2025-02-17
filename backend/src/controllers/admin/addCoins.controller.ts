import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { UserModel } from "../../models/user.model";

export const addCoins = asyncHandler(async (req: Request, res: Response) => {
  const amount = req.body.amount;
  const email = req.body.email;

  if (!email || !amount) {
    return res.status(400).json({ message: "Email and amount are required." });
  }

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await UserModel.updateOne(
      {
        email,
      },
      {
        $set: {
          coinBalance: user.coinBalance + amount,
        },
      }
    );

    res
      .status(200)
      .json({ message: "Successfully transferred coins to the user account" });
  } catch (e) {
    res
      .status(500)
      .json({ message: "An error occurred while transferring coins" });
  }
});
