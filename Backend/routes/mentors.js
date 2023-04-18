import { Router } from "express";
import { addMentor, submitMarks } from "../controllers/mentor.js";

const router = Router();

router.post("/add", addMentor);
router.post("/submit", submitMarks);

export default router;
