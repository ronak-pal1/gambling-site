import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { UserModel } from "../../models/user.model";

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find().select({
      email: 1,
      name: 1,
      coinBalance: 1,
      isBlocked: 1,
    });

    res.status(200).json({ message: "All users fetched successfully", users });
  } catch (e) {
    res.status(500).json({ message: "An error occurred while getting users" });
  }
});

export const removeUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.body.userId;

  if (!userId) return res.status(400).json({ message: "User id is not given" });
  try {
    await UserModel.deleteOne({
      _id: userId,
    });

    res.status(200).json({ message: "User is removed successfully" });
  } catch (e) {
    res.status(500).json({ message: "An error occurred while removing user" });
  }
});

export const setUserBlockState = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.body.userId;
    const state = req.body.state;

    if (!userId)
      return res.status(400).json({ message: "User id is not given" });

    try {
      await UserModel.updateOne(
        {
          _id: userId,
        },
        {
          $set: {
            isBlocked: state,
          },
        }
      );

      res
        .status(200)
        .json({ message: "User's block state is changed successfully" });
    } catch (e) {
      res.status(500).json({
        message: "An error occurred while changing user's block state user",
      });
    }
  }
);
