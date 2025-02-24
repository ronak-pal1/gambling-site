import { Model, Schema, SchemaType, model } from "mongoose";

export interface IAlert extends Document {
  by: Schema.Types.ObjectId;
  acceptedBy: Schema.Types.ObjectId;
  eventId: Schema.Types.ObjectId;
  amount: number;
  endTime: Date;
  odds: number;
  team: string;
  status: string;
  previousTransactionId: Schema.Types.ObjectId;
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
    previousTransactionId: {
      type: Schema.Types.ObjectId,
      required: true,
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
