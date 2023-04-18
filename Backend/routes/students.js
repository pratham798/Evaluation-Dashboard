import { Router } from "express";
import {
  addStudent,
  deleteStudent,
  updateMarks,
  viewStudents,
} from "../controllers/student.js";

const router = Router();

router.post("/add", addStudent);
router.post("/update/:studentId", updateMarks);
router.get("/view", viewStudents);
router.post("/delete/:studentId", deleteStudent);

export default router;
