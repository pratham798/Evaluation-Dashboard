import { Router } from "express";
import {
  addStudent,
  assignMentor,
  deleteStudent,
  evaluateStudent,
  filterStudent,
  getStudentsByMentor,
  unassignMentor,
  updateMarks,
  viewStudents,
} from "../controllers/student.js";

const router = Router();

router.post("/add", addStudent);
router.post("/update/:studentId", updateMarks); //studentId is passed in the form of params for updating marks of specific student
router.get("/view", viewStudents);
router.post("/delete/:studentId", deleteStudent);
router.get("/filter", filterStudent);
router.post("/assign", assignMentor);
router.get("/studentbyMentor/:mentor", getStudentsByMentor);
router.post("/unassign", unassignMentor);
router.post("/evaluate/:studentId", evaluateStudent);
export default router;
