import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { EventModel } from "../../models/event.model";

export const addEvent = asyncHandler(async (req: Request, res: Response) => {
  const sportName = req.body.sportName;
  const team1 = req.body.team1;
  const team2 = req.body.team2;
  const date = req.body.date;
  const timing = req.body.timing;
  const prizePool = req.body.prizePool;

  // Input validation
  if (!sportName || !team1 || !team2 || !date || !timing || !prizePool) {
    return res
      .status(400)
      .json({ message: "All info is needed to create a event" });
  }

  try {
    const newEvent = new EventModel({
      sportName,
      team1,
      team2,
      date,
      timing,
      prizePool,
    });

    await newEvent.save();

    res.status(200).json({ message: "Event is added successfully" });
  } catch (e) {
    res.status(500).json({ message: "An error occurred while adding a event" });
  }
});
