// src/controllers/review.controller.js

import { getReview } from "../repositories/review.repository.js";
import { responseFromReviews } from "../dtos/user.dto.js";
import { listUserReviews } from "../services/review.service.js";


export const handleListStoreReviews = async (req, res) => {
    try {
        const storeId = Number(req.params.storeId);
        const query = req.query; // 페이지네이션 등
        const reviews = await getReview(storeId, query);
        
        res.status(200).json(responseFromReviews(reviews));
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "리뷰 조회 중 오류가 발생했습니다." });
    }
};
export const handleGetUserReviews = async (req, res) => {
    try {
        const userId = req.params.userId;
        const result = await listUserReviews(userId, req.query);
        
        res.json(result);
    
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "리뷰 조회 중 오류가 발생했습니다." });
    }
};
