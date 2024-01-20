import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import { createOrder, getAllOrders } from "../controllers/order.controller";
const orderRouter = express.Router();

orderRouter.post("/create-order", isAutheticated as any, createOrder as any);
orderRouter.get(
  "/get-orders",
  isAutheticated as any,
  authorizeRoles("admin"),
  getAllOrders as any
);

export default orderRouter;
