import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { EventModel } from "../../models/event.model";
import mongoose from "mongoose";

export const getSingleEvent = asyncHandler(
  async (req: Request, res: Response) => {
    const eventId = req.params["id"];

    if (!eventId)
      return res.status(400).json({ message: "Event Id is not given" });

    try {
      const event = await EventModel.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(eventId) }, // Match the main event by eventId
        },
        {
          $lookup: {
            from: "events", // Collection name of EventModel
            localField: "connectedEventId", // The field that connects to another event
            foreignField: "_id", // Match with the _id of another event
            as: "connectedEventDetails", // New field containing connected event data
          },
        },
        {
          $unwind: {
            path: "$connectedEventDetails",
            preserveNullAndEmptyArrays: true, // Allow cases where no connected event exists
          },
        },
        {
          $project: {
            _id: 1,
            sportName: 1,
            team1: 1,
            team2: 1,
            date: 1,
            startTime: 1,
            endTime: 1,
            prizePool: 1,
            prizePoolLabel: 1,
            isPinned: 1,
            connectedEventId: 1,
            connectedEvent: {
              _id: "$connectedEventDetails._id",
              sportName: "$connectedEventDetails.sportName",
              team1: "$connectedEventDetails.team1",
              team2: "$connectedEventDetails.team2",
            },
          },
        },
      ]);

      if (!event) {
        return res.status(404).json({ message: "Event is not found" });
      }

      res
        .status(200)
        .json({
          message: "Event info is fetched successfully",
          event: event[0],
        });
    } catch (e) {
      res.status(500).json({
        message: "An error occurred while fetching event information",
      });
    }
  }
);
