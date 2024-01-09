import express from "express";
import {
  activationUser,
  logOutUser,
  loginUser,
  registrationUser,
  updateAccessToken,
} from "../controllers/user.controller";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
const userRouter = express.Router();

userRouter.post("/registration", registrationUser as any);

userRouter.post("/activate-user", activationUser as any);

userRouter.post("/login", loginUser as any);

userRouter.get("/logout", isAutheticated as any, logOutUser as any);

userRouter.get("/refresh", updateAccessToken as any);
export default userRouter;
