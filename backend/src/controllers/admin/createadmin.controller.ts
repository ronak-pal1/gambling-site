import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { AdminModel } from "../../models/admin.model";

export const createadmin = asyncHandler(async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const newAdmin = new AdminModel({
      email,
      password,
    });

    await newAdmin.save();

    res.status(200).json({ message: "Admin is created successfully" });
  } catch (e) {
    res.status(500).json({ message: "Error in creating a new admin" });
  }
});
