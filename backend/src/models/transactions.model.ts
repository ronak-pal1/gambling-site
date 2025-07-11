import { Model, Schema, model } from "mongoose";
import { IUser } from "./user.model";
import { IEvent } from "./event.model";

export enum TRANSAC_TYPE {
  "coinbuy" = "coinbuy",
  "bet" = "bet",
}

export interface ITransaction extends Document {
  userId: Schema.Types.ObjectId | IUser;
  eventId: Schema.Types.ObjectId | IEvent;
  team: string;
  amount: number;
  odds: number;
  type: TRANSAC_TYPE;
  status: string;
  isSettled: boolean;
}

const TransactionSchema: Schema<ITransaction> = new Schema<ITransaction>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "event",
    },
    amount: {
      type: Number,
    },
    team: {
      type: String,
    },
    type: {
      type: String,
      enum: Object.values(TRANSAC_TYPE),
      default: TRANSAC_TYPE.coinbuy,
    },
    odds: {
      type: Number,
    },
    status: {
      type: String,
      trim: true,
    },
    isSettled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const TransactionModel: Model<ITransaction> = model<ITransaction>(
  "Transaction",
  TransactionSchema
);
