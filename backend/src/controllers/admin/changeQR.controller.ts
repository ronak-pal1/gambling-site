import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { AdminModel } from "../../models/admin.model";

export const changeQR = asyncHandler(async (req: Request, res: Response) => {
  try {
    const qrURL = req.fileURL;
    const adminInstance = req.admin;

    await AdminModel.updateOne(
      {
        _id: adminInstance._id,
      },
      {
        $set: {
          qrURL,
        },
      }
    );

    res.status(200).json({ message: "The QR is updated successfully", qrURL });
  } catch (e) {
    return res.status(500).json({ message: "Error in updating the QR code" });
  }
});
