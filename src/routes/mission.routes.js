import express from "express";
import { challengeMission } from "../controllers/mission.controller.js";
import { handleGetMissionsByStore } from "../controllers/mission.controller.js";
import { handleGetUserOngoingMissions } from "../controllers/mission.controller.js";

const router = express.Router();

// POST /api/v1/missions/:missionId/challenge
router.post("/:missionId/challenge", challengeMission);
router.get("/stores/:storeId/missions", handleGetMissionsByStore);
router.get("/users/:userId/ongoing", handleGetUserOngoingMissions);

export default router;
