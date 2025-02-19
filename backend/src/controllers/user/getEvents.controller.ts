import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { EventModel } from "../../models/event.model";

export const getAllEvents = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const events = await EventModel.aggregate([
        {
          $project: {
            _id: 1,
            sportName: 1,
            date: 1,
            startTime: 1,
            endTime: 1,
            prizePool: 1,
            team1Name: "$team1.teamName",
            team2Name: "$team2.teamName",
          },
        },
      ]);

      res
        .status(200)
        .json({ message: "All events fetched successfully", events });
    } catch (e) {
      res
        .status(500)
        .json({ message: "An error occurred while getting events" });
    }
  }
);

export const getOngoingEvents = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const currentDate = new Date();
      const currentTime = currentDate.toISOString().split("T")[1].slice(0, 5); // Get "HH:MM" format

      const events = await EventModel.aggregate([
        {
          $match: {
            date: {
              $gte: new Date(currentDate.setHours(0, 0, 0, 0)), // Start of today
              $lt: new Date(currentDate.setHours(23, 59, 59, 999)), // End of today
            },
            startTime: { $lte: currentTime }, // Event has started
            endTime: { $gte: currentTime }, // Event has not yet ended
          },
        },
        {
          $project: {
            _id: 1,
            sportName: 1,
            date: 1,
            startTime: 1,
            endTime: 1,
            prizePool: 1,
            team1Name: "$team1.teamName",
            team2Name: "$team2.teamName",
          },
        },
      ]);

      res
        .status(200)
        .json({ message: "All ongoing events fetched successfully", events });
    } catch (e) {
      res
        .status(500)
        .json({ message: "An error occurred while getting events" });
    }
  }
);
