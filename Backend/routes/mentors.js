import { Router } from "express";
import { addMentor, showMentor, submitMarks } from "../controllers/mentor.js";

const router = Router();

router.post("/add", addMentor);
router.post("/submit", submitMarks);
router.get("/viewMentor", showMentor);

export default router;
