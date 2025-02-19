import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { AdminModel } from "../../models/admin.model";

export const login = asyncHandler(async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  // Input validation
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    // Check if company with the given email exists
    const admin = await AdminModel.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "User not found." });
    }

    // Verify the password
    const isPasswordValid = await admin.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const accessToken = admin.generateAccessToken();
    const refreshToken = admin.generateRefreshToken();

    await AdminModel.updateOne(
      {
        email,
      },
      {
        $set: {
          refreshToken,
        },
      }
    );

    res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 4 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: "Login successful.",
      });
  } catch (e) {
    console.error("Error during login:", e);
    res.status(500).json({ message: "An error occurred during login." });
  }
});
