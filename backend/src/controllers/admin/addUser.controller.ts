import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { UserModel } from "../../models/user.model";

export const addUser = asyncHandler(async (req: Request, res: Response) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  // Input validation
  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ message: "Email and password and name are required." });
  }

  try {
    // Check if user with the given email exists
    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(404).json({ message: "User already exits" });
    }

    const u = new UserModel({
      name,
      email,
      password,
    });

    await u.save();

    res.status(200).json({ message: "User is added successfully" });
  } catch (e) {
    res.status(500).json({ message: "An error occurred whil adding a user" });
  }
});
