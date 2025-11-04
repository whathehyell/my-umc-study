import express from "express";
import { addStoreToRegion } from "../controllers/region.controller.js";

const router = express.Router();

// ✅ POST /api/v1/regions/:regionId/stores
router.post("/:regionId/stores", addStoreToRegion);

export default router;
