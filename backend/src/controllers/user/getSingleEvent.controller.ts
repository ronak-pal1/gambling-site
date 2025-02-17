import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { EventModel } from "../../models/event.model";

export const getSingleEvent = asyncHandler(
  async (req: Request, res: Response) => {
    const eventId = req.params["id"];

    if (!eventId)
      return res.status(400).json({ message: "Event Id is not given" });

    try {
      const event = await EventModel.findById(eventId);

      if (!event) {
        return res.status(404).json({ message: "Event is not found" });
      }

      res
        .status(200)
        .json({ message: "Event info is fetched successfully", event });
    } catch (e) {
      res.status(500).json({
        message: "An error occurred while fetching event information",
      });
    }
  }
);
