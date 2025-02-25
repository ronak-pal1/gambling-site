import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { AlertModel } from "../../models/alerts.model";

export const getAlerts = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;

  try {
    const alerts = await AlertModel.aggregate([
      // Step 1: Filter alerts (Exclude user's alerts & expired alerts)
      {
        $match: {
          endTime: { $gt: new Date() }, // Only alerts with future endTime
        },
      },

      // Step 2: Join with EventModel to get event details
      {
        $lookup: {
          from: "events", // MongoDB collection name for EventModel
          localField: "eventId",
          foreignField: "_id",
          as: "eventDetails",
        },
      },

      // Step 3: Unwind eventDetails array (since lookup returns an array)
      {
        $unwind: "$eventDetails",
      },

      // Step 4: Project required fields and create matchBetween field
      {
        $project: {
          _id: 1,
          amount: 1,
          endTime: 1,
          odds: 1,
          team: 1,
          status: 1,
          sportName: "$eventDetails.sportName",
          team1: "$eventDetails.team1.teamName",
          team2: "$eventDetails.team2.teamName",
          oppositeOdds: {
            $cond: {
              if: { $eq: ["$eventDetails.team1.teamName", "$team"] },
              then: "$eventDetails.team2.odds",
              else: "$eventDetails.team1.odds",
            },
          },
          createdAt: 1,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    res
      .status(200)
      .json({ message: "Alerts are fetched successfully", alerts });
  } catch (e) {
    return res.status(500).json({ message: "Error in getting all the alerts" });
  }
});
