import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";

export const startBet = asyncHandler(async (req: Request, res: Response) => {
  const eventId = req.body.eventId;
  const endtime = req.body.endtime;
  const amount = req.body.amount;
  const userInstance = req.user;

  try {
  } catch (e) {
    return res.status(500).json({ message: "Error while initiating a bet" });
  }
});
