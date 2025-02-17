import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { UserModel } from "../../models/user.model";

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find().select({
      email: 1,
      name: 1,
      coinBalance: 1,
    });

    res.status(200).json({ message: "All users fetched successfully", users });
  } catch (e) {
    res.status(500).json({ message: "An error occurred while getting users" });
  }
});
