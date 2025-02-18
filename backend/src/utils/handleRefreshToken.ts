import { CookieOptions, NextFunction, Request, Response } from "express";
import AppError from "./appError";
import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "./asyncHandler";
import { AdminModel } from "../models/admin.model";
import { AUTH_ROLES } from "./roles";
import { UserModel } from "../models/user.model";

export const handleRefreshAccessToken = (requiredRole: AUTH_ROLES) => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const incomingRefreshToken = req.cookies?.refreshToken;

      if (!incomingRefreshToken) {
        return next(new AppError("Unauthorized request", 401));
      }

      try {
        const decodedToken = jwt.verify(
          incomingRefreshToken,
          process.env.REFRESH_TOKEN_SECRET as string
        ) as JwtPayload;

        let InstanceModel: any = UserModel;

        if (decodedToken?.role == AUTH_ROLES.ADMIN) InstanceModel = AdminModel;

        const instance = await InstanceModel.findById(decodedToken?._id);

        if (!instance) {
          return next(new AppError("Invalid refresh token", 401));
        }

        if (incomingRefreshToken !== instance.refreshToken) {
          return next(new AppError("Refresh token is expired or used", 401));
        }

        const options: CookieOptions = {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          // sameSite: "strict",
        };

        const accessToken = instance.generateAccessToken();
        const refreshToken = instance.generateRefreshToken();

        return res
          .status(200)
          .cookie("accessToken", accessToken, options)
          .cookie("refreshToken", refreshToken, options)
          .json({ message: "tokens refreshed" });
      } catch (error: any) {
        return next(
          new AppError(error?.message || "Invalid refresh token", 400)
        );
      }
    }
  );
};
