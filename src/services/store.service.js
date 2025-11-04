import { addReviewRepo, checkStoreExists } from "../repositories/store.repository.js";

export const addReviewService = async (storeId, content, rating) => {
    const exists = await checkStoreExists(storeId);
    if (!exists) {
        throw new Error("존재하지 않는 가게입니다.");
    }
    
    const reviewId = await addReviewRepo(storeId, content, rating);
    return reviewId;
};
