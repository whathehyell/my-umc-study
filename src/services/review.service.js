import { getReviewsByUser } from "../repositories/review.repository.js";
import { responseFromUserReviews } from "../dtos/review.dto.js";

export const listUserReviews = async (userId, query) => {
    const { cursor, size } = query;
    
    const reviews = await getReviewsByUser(userId, cursor, size);
    
    return responseFromUserReviews(reviews);
};
