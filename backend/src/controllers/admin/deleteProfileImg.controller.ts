import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import deleteS3File from "../../utils/deleteS3File";

export const deleteProfileImg = asyncHandler(
  async (req: Request, res: Response) => {
    const url = req.body.url;

    try {
      await deleteS3File(url);

      res
        .status(200)
        .json({ message: "The profile image is deleted successfully" });
    } catch (e) {
      res.status(500).json({ message: "Error in deleting the profile image" });
    }
  }
);
