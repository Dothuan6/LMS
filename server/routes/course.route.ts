import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import {
  addAnswer,
  addQuestion,
  addReplyToReview,
  addReview,
  deleteCourse,
  editCourse,
  getAllCourse,
  getAllCourses,
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

courseRouter.get(
  "/get-courses",
  isAutheticated as any,
  authorizeRoles("admin"),
  getAllCourses as any
);
courseRouter.delete(
  "/delete-course/:id",
  isAutheticated as any,
  authorizeRoles("admin"),
  deleteCourse as any
);
export default courseRouter;
