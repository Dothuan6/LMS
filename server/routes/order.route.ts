import express from "express";
import { isAutheticated } from "../middleware/auth";
import { createOrder } from "../controllers/order.controller";
const orderRouter = express.Router();

orderRouter.post("/create-order", isAutheticated as any, createOrder as any);
export default orderRouter;
