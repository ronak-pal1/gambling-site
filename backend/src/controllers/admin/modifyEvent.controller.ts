import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";

export const modifyEvent = asyncHandler(async (req: Request, res: Response) => {
  const eventId = req.body.eventId;
  const changedInfo = req.body.changedInfo;

  if (!eventId) {
    return res.status(400).json({ message: "Event id is not given" });
  }

  try {
  } catch (e) {
    return res.status(500).json({ message: "Error while modifying event" });
  }
});
