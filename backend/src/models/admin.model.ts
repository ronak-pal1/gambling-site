import { Model, Schema, model } from "mongoose";

export interface IAdmin extends Document {
  email: string;
  password: string;
  refreshToken: string;
}

const AdminSchema: Schema<IAdmin> = new Schema<IAdmin>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  refreshToken: {
    type: String,
  },
});

export const AdminModel: Model<IAdmin> = model<IAdmin>("User", AdminSchema);
