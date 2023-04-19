import { Router } from "express";
import {
  addMentor,
  decCount,
  incCount,
  showMentor,
  submitMarks,
} from "../controllers/mentor.js";

const router = Router();

router.post("/add", addMentor);
router.post("/submit", submitMarks);
router.get("/viewMentor", showMentor);
router.post("/increase/:mentorId", incCount);
router.post("/decrease/:mentorId", decCount);

export default router;
