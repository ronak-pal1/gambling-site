import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { EventModel } from "../../models/event.model";

export const modifyEvent = asyncHandler(async (req: Request, res: Response) => {
  const eventId = req.body.eventId;
  const changedInfo = req.body.changedInfo;

  if (!eventId) {
    return res.status(400).json({ message: "Event id is not given" });
  }

  try {
    await EventModel.updateOne(
      {
        _id: eventId,
      },
      {
        $set: changedInfo,
      }
    );

    res.status(200).json({
      message: "Event is modified successfully",
    });
  } catch (e) {
    return res.status(500).json({ message: "Error while modifying event" });
  }
});

export const deleteEvent = asyncHandler(async (req: Request, res: Response) => {
  const eventId = req.body.eventId;

  if (!eventId) {
    return res.status(400).json({ message: "Event id is not given" });
  }

  try {
    await EventModel.deleteOne({
      _id: eventId,
    });

    res.status(200).json({ message: "The event is deleted successfully" });
  } catch (e) {
    return res.status(500).json({ message: "Error in deleting the event" });
  }
});
