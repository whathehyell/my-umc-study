import { addReviewService } from "../services/store.service.js";

export const addReviewToStore = async (req, res) => {
    try {
        const storeId = parseInt(req.params.storeId, 10);
        const { content, rating } = req.body;
        
        const reviewId = await addReviewService(storeId, content, rating);
        res.status(201).json({
            message: "리뷰가 등록되었습니다.",
            reviewId,
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({
            message: err.message || "리뷰 등록 중 오류 발생",
        });
    }
};

export const handleListStoreReviews = async (req, res, next) => {
    const reviews = await listStoreReviews(
        parseInt(req.params.storeId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).success(reviews);
};
