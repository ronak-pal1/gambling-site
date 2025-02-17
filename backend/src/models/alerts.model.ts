import { Model, Schema, model } from "mongoose";

export interface IAlert extends Document {
  by: Schema.Types.ObjectId;
  eventId: Schema.Types.ObjectId;
  amount: number;
}

const AlertSchema: Schema<IAlert> = new Schema<IAlert>(
  {
    by: {
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
  },
  {
    timestamps: true,
  }
);

export const AlertModel: Model<IAlert> = model<IAlert>("Alert", AlertSchema);
