import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { AdminModel } from "../../models/admin.model";

export const getQR = asyncHandler(async (req: Request, res: Response) => {
  try {
    const admin = await AdminModel.find();

    if (admin.length == 0) {
      return res.status(400).json({ message: "Can't fetch the QR" });
    }

    res
      .status(200)
      .json({ message: "Fetched QR successfully", qrURL: admin[0].qrURL });
  } catch (e) {
    res.status(500).json({ message: "Error in fetching the qr" });
  }
});
