import { Model, Schema, model } from "mongoose";

export interface IAlert extends Document {
  by: Schema.Types.ObjectId;
  acceptedBy: Schema.Types.ObjectId;
  eventId: Schema.Types.ObjectId;
  amount: number;
  endTime: Date;
  odds: number;
  team: string;
  status: string;
}

const AlertSchema: Schema<IAlert> = new Schema<IAlert>(
  {
    by: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    acceptedBy: {
      type: Schema.Types.ObjectId,
    },
    eventId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    odds: {
      type: Number,
      required: true,
    },
    team: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const AlertModel: Model<IAlert> = model<IAlert>("Alert", AlertSchema);
