import { Model, Schema, model } from "mongoose";

type Team = {
  teamName: string;
  players: { name: string; role: string; img: string }[];
  odds: number;
  score: string;
  logo: string;
};

enum WINNING_TEAMS {
  team1 = "team1",
  team2 = "team2",
  notdecided = "",
}

export interface IEvent extends Document {
  sportName: string;
  team1: Team;
  team2: Team;
  date: Date;
  startTime: string;
  endTime: string;
  prizePool: number;
  prizePoolLabel: string;
  isPinned: boolean;
  connectedEventId: Schema.Types.ObjectId;
  winningTeam: WINNING_TEAMS;
}

const EventSchema: Schema<IEvent> = new Schema<IEvent>(
  {
    sportName: {
      type: String,
      required: true,
      trim: true,
    },
    connectedEventId: {
      type: Schema.Types.ObjectId,
      ref: "event",
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
            trim: true,
          },
        },
      ],
      odds: {
        type: Number,
        default: 1,
      },
      score: {
        type: String,
        default: "0",
      },
      logo: {
        type: String,
        default: "",
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
            trim: true,
          },
        },
      ],
      odds: {
        type: Number,
        default: 1,
      },
      score: {
        type: String,
        default: "0",
      },
      logo: {
        type: String,
        default: "",
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
    prizePoolLabel: {
      type: String,
    },

    isPinned: {
      type: Boolean,
      default: false,
    },

    winningTeam: {
      type: String,
      enum: Object.values(WINNING_TEAMS),
      default: WINNING_TEAMS.notdecided,
    },
  },
  {
    timestamps: true,
  }
);

export const EventModel: Model<IEvent> = model<IEvent>("Event", EventSchema);
