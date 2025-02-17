import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { UserModel } from "../../models/user.model";

export const getCurrentUser = asyncHandler(
  async (req: Request, res: Response) => {
    const userInstance = req.user;

    try {
      res.status(200).json({
        message: "User details fetched",
        user: {
          name: userInstance.name,
          email: userInstance.email,
          balance: userInstance.coinBalance,
        },
      });
    } catch (e) {
      res
        .status(500)
        .json({ message: "An error occurred while fetching user details" });
    }
  }
);
