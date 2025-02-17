import { Model, Schema, model } from "mongoose";

export interface ITransaction extends Document {
  from: Schema.Types.ObjectId;
  to: Schema.Types.ObjectId;
  eventId: Schema.Types.ObjectId;
  amount: number;
}

const TransactionSchema: Schema<ITransaction> = new Schema<ITransaction>(
  {
    from: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    to: {
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

export const TransactionModel: Model<ITransaction> = model<ITransaction>(
  "Transaction",
  TransactionSchema
);
