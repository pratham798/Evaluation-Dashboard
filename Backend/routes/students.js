import { Router } from "express";
import {
  addStudent,
  deleteStudent,
  finalize,
  updateMarks,
} from "../controllers/student.js";

const router = Router();

router.post("/add", addStudent);
router.post("/update", updateMarks);
router.post("/submit", finalize);
router.post("/delete", deleteStudent);

export default router;
