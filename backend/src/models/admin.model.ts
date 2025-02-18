import { Model, Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AUTH_ROLES } from "../utils/roles";

export interface IAdmin extends Document {
  email: string;
  password: string;
  refreshToken: string;
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
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

AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error: any) {
    next(error);
  }
});

AdminSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// schema method to generate a access token
AdminSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: AUTH_ROLES.ADMIN,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: Number(process.env.ACCESS_TOKEN_EXPIRATION),
    }
  );
};

// schema method to generate a refresh token
AdminSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      role: AUTH_ROLES.ADMIN,
    },
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: Number(process.env.REFRESH_TOKEN_EXPIRATION),
    }
  );
};

export const AdminModel: Model<IAdmin> = model<IAdmin>("Admin", AdminSchema);
