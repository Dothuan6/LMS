import { NextFunction, Response } from "express";
import CourseModel from "../models/course.model";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";

//create course
export const createCourse = CatchAsyncError(
  async (data: any, res: Response, next: NextFunction) => {
    try {
      const course = await CourseModel.create(data);
      res.status(201).json({
        success: true,
        message: "Khóa học đã được tạo thành công",
        data: course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
export default createCourse;
