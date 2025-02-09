import { Model, Schema, model } from "mongoose";

export interface IEvent extends Document {
  name: string;
  email: string;
  refreshToken: string;
}

const EventSchema: Schema<IEvent> = new Schema<IEvent>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const EventModel: Model<IEvent> = model<IEvent>("User", EventSchema);
