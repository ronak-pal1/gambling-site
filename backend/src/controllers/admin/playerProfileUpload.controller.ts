import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";

export const playerProfileUpload = asyncHandler(
  async (req: Request, res: Response) => {
    const imgURL = req.fileURL;

    try {
      if (imgURL)
        res
          .status(200)
          .json({ message: "Image is uploaded successfully", imgURL });
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Error while uploading the player profile" });
    }
  }
);
