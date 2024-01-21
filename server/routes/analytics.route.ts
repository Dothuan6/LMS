import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import {
  getOrderAnalytics,
  getUserAnalytics,
} from "../controllers/analytics.controller";
const analyticsRouter = express.Router();

analyticsRouter.get(
  "/get-users-analytics",
  isAutheticated as any,
  authorizeRoles("admin"),
  getUserAnalytics as any
);

analyticsRouter.get(
  "/get-courses-analytics",
  isAutheticated as any,
  authorizeRoles("admin"),
  getUserAnalytics as any
);
analyticsRouter.get(
  "/get-orders-analytics",
  isAutheticated as any,
  authorizeRoles("admin"),
  getOrderAnalytics as any
);

export default analyticsRouter;
