import { prisma } from "../db.config.js";

export const getReview = async (storeId, query) => {
    return previewReviewResponseDTO(await getPreviewReview(reviewId, size, storeId));
}

export const previewReviewResponseDTO = (data) => {
    return {"reviewData": null, "cursorId": null};
}
export const getReviewsByUser = async (userId, cursor, size) => {
    const reviews = await prisma.userStoreReview.findMany({
        where: { userId: Number(userId) },
        take: Number(size) || 10,
        skip: cursor ? 1 : 0,
        cursor: cursor ? { id: Number(cursor) } : undefined,
        orderBy: { id: "desc" },
        include: {
            store: true,
            user: true,
        },
    });
    return reviews;
};