import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";

export const getQR = asyncHandler(async (req: Request, res: Response) => {
  const admin = req.admin;
  try {
    res
      .status(200)
      .json({ message: "Fetch qr successfully", qrURL: admin.qrURL });
  } catch (e) {
    return res.status(500).json({ message: "Error in fetching the qr" });
  }
});
