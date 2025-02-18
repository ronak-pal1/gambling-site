import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { EventModel } from "../../models/event.model";

export const getAllEvents = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const events = await EventModel.find().select({
        sportName: 1,
        date: 1,
        startTime: 1,
        endTime: 1,
        team1: 1,
        team2: 1,
      });

      res.status(200).json({ message: "Events fetched successfully", events });
    } catch (e) {
      return res
        .status(200)
        .json({ message: "Error while fetching all events" });
    }
  }
);
