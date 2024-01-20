import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import {
  getNotifications,
  updateNotification,
} from "../controllers/notification.controller";
const notificationRoute = express.Router();

notificationRoute.get(
  "/get-all-notifications",
  isAutheticated as any,
  authorizeRoles("admin"),
  getNotifications as any
);

notificationRoute.put(
  "/update-notification/:id",
  isAutheticated as any,
  authorizeRoles("admin"),
  updateNotification as any
);
export default notificationRoute;
