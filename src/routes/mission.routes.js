import express from "express";
import { challengeMission } from "../controllers/mission.controller.js";

const router = express.Router();

// POST /api/v1/missions/:missionId/challenge
router.post("/:missionId/challenge", challengeMission);

export default router;
