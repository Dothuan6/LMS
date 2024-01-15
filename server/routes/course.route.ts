import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import {
  addAnswer,
  addQuestion,
  addReplyToReview,
  addReview,
  editCourse,
  getAllCourse,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from "../controllers/course.controller";
const courseRouter = express.Router();

courseRouter.post(
  "/create-course",
  isAutheticated as any,
  authorizeRoles("admin"),
  uploadCourse as any
);
courseRouter.put(
  "/edit-course/:id",
  isAutheticated as any,
  authorizeRoles("admin"),
  editCourse as any
);

courseRouter.get("/get-course/:id", getSingleCourse as any);
courseRouter.get("/get-course", getAllCourse as any);
courseRouter.get(
  "/get-course-content/:id",
  isAutheticated as any,
  getCourseByUser as any
);

courseRouter.put(
  "/add-question/:id",
  isAutheticated as any,
  addQuestion as any
);

courseRouter.put("/add-answer/:id", isAutheticated as any, addAnswer as any);
courseRouter.put("/add-review/:id", isAutheticated as any, addReview as any);
courseRouter.put(
  "/add-reply",
  isAutheticated as any,
  authorizeRoles("admin"),
  addReplyToReview as any
);

export default courseRouter;
