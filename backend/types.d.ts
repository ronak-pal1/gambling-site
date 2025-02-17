import { Request } from "express";
import { AdminModel } from "./src/models/admin.model";
import { UserModel } from "./src/models/user.model";
declare global {
  namespace Express {
    interface Request {
      user?: UserModel;
      admin?: AdminModel;
    }
  }
}
