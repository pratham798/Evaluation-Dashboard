import { Router } from "express";
import mentors from "./mentors.js";
import students from "./students.js";

const router = Router();

router.use("/v1/mentor", mentors);
router.use("/v1/students", students);
export default router;
