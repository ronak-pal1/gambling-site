import { Model, Schema, model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  refreshToken: string;
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
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

export const UserModel: Model<IUser> = model<IUser>("User", UserSchema);
