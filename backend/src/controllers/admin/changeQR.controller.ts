import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";

export const changeQR = asyncHandler(async (req: Request, res: Response) => {
  try {
  } catch (e) {
    return res.status(500).json({ message: "Error in updating the QR code" });
  }
});
