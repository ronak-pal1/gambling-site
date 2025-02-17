import { Model, Schema, model } from "mongoose";

type Team = {
  teamName: string;
  players: { name: string; role: string; img: string }[];
  odds: number;
};

export interface IEvent extends Document {
  sportName: string;
  team1: Team;
  team2: Team;
  date: Date;
  timing: string;
  prizePool: number;
}

const EventSchema: Schema<IEvent> = new Schema<IEvent>(
  {
    sportName: {
      type: "string",
      required: true,
      trim: true,
    },
    team1: {
      teamName: {
        type: "string",
        required: true,
        trim: true,
      },
      players: [
        {
          name: {
            type: "string",
            required: true,
            trim: true,
          },
          role: {
            type: "string",
            required: true,
            trim: true,
          },
          img: {
            type: "string",
            required: true,
            trim: true,
          },
        },
      ],
    },
    team2: {
      teamName: {
        type: "string",
        required: true,
        trim: true,
      },
      players: [
        {
          name: {
            type: "string",
            required: true,
            trim: true,
          },
          role: {
            type: "string",
            required: true,
            trim: true,
          },
          img: {
            type: "string",
            required: true,
            trim: true,
          },
        },
      ],
    },

    date: {
      type: "Date",
      required: true,
    },
    timing: {
      type: "string",
      required: true,
      trim: true,
    },
    prizePool: {
      type: "number",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const EventModel: Model<IEvent> = model<IEvent>("Event", EventSchema);
