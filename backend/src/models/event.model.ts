import { Model, Schema, model } from "mongoose";

type Team = {
  teamName: string;
  players: { name: string; role: string; img: string }[];
  odds: number;
  score: number;
};

export interface IEvent extends Document {
  sportName: string;
  team1: Team;
  team2: Team;
  date: Date;
  startTime: string;
  endTime: string;
  prizePool: number;
}

const EventSchema: Schema<IEvent> = new Schema<IEvent>(
  {
    sportName: {
      type: String,
      required: true,
      trim: true,
    },
    team1: {
      teamName: {
        type: String,
        required: true,
        trim: true,
      },
      players: [
        {
          name: {
            type: String,
            required: true,
            trim: true,
          },
          role: {
            type: String,
            required: true,
            trim: true,
          },
          img: {
            type: String,
            required: true,
            trim: true,
          },
        },
      ],
      odds: {
        type: Number,
        default: 1,
      },
      score: {
        type: Number,
        default: 0,
      },
    },
    team2: {
      teamName: {
        type: String,
        required: true,
        trim: true,
      },
      players: [
        {
          name: {
            type: String,
            required: true,
            trim: true,
          },
          role: {
            type: String,
            required: true,
            trim: true,
          },
          img: {
            type: String,
            required: true,
            trim: true,
          },
        },
      ],
      odds: {
        type: Number,
        default: 1,
      },
      score: {
        type: Number,
        default: 0,
      },
    },

    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
      trim: true,
    },
    endTime: {
      type: String,
      required: true,
      trim: true,
    },
    prizePool: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const EventModel: Model<IEvent> = model<IEvent>("Event", EventSchema);
