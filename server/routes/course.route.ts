import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import {
  editCourse,
  getAllCourse,
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
export default courseRouter;
