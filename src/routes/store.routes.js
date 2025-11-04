import express from "express";
import { addReviewToStore } from "../controllers/store.controller.js";
import { addMissionToStore } from "../controllers/mission.controller.js"; // ✅ 추가

const router = express.Router();

// POST /api/v1/stores/:storeId/reviews
router.post("/:storeId/reviews", addReviewToStore);
router.post("/:storeId/missions", addMissionToStore); 


export default router;
