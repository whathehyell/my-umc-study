import express from "express";
import { handleGetUserReviews } from "../controllers/review.controller.js";

const router = express.Router();

router.get("/users/:userId/reviews", handleGetUserReviews);

export default router;
