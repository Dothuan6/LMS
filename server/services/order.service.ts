import mongoose, { Document } from "mongoose";
import { NextFunction, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import OrderModel from "../models/orderModel";

//create new order
export const newOrder = CatchAsyncError(
  async (data: any, res: Response, next: NextFunction) => {
    const order = await OrderModel.create(data);
    res.status(201).json({
      success: true,
      order,
    });
  }
);
//get all order
export const getAllOrdersService = async (res: Response) => {
  const users = await OrderModel.find().sort({
    createAt: -1,
  });
  res.status(201).json({
    success: true,
    users,
  });
};
