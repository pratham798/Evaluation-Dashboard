import { Router } from "express";
import { addMentor } from "../controllers/mentor.js";

const router = Router();

router.post("/add", addMentor);

export default router;
