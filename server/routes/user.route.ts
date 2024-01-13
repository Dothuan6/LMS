import express from "express";
import {
  activationUser,
  getUserInfo,
  logOutUser,
  loginUser,
  registrationUser,
  socialAuth,
  updateAccessToken,
  updatePassword,
  updateProfilePicture,
  updateUserInfo,
} from "../controllers/user.controller";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import { getUserById } from "../services/user.service";
const userRouter = express.Router();

userRouter.post("/registration", registrationUser as any);

userRouter.post("/activate-user", activationUser as any);

userRouter.post("/login", loginUser as any);

userRouter.get("/logout", isAutheticated as any, logOutUser as any);

userRouter.get("/refresh", updateAccessToken as any);

userRouter.get("/me", isAutheticated as any, getUserInfo as any);

userRouter.post("/social-auth", socialAuth as any);

userRouter.put(
  "/update-user-info",
  isAutheticated as any,
  updateUserInfo as any
);

userRouter.put(
  "/update-user-password",
  isAutheticated as any,
  updatePassword as any
);

userRouter.put(
  "/update-user-avatar",
  isAutheticated as any,
  updateProfilePicture as any
);
export default userRouter;