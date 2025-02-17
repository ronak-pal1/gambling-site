import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { EventModel } from "../../models/event.model";

export const getEvents = asyncHandler(async (req: Request, res: Response) => {
  try {
    const events = await EventModel.find();

    res
      .status(200)
      .json({ message: "All events fetched successfully", events });
  } catch (e) {
    res.status(500).json({ message: "An error occurred while getting events" });
  }
});
