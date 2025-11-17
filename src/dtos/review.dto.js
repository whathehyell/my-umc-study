export const responseFromUserReviews = (reviews) => ({
    data: reviews.map((review) => ({
        reviewId: review.id,
        content: review.content,
        rating: review.rating,
        createdAt: review.createdAt,
        storeName: review.store.name,
        username: review.user.name,
    })),
    pagination: {
        cursor: reviews.length ? reviews[reviews.length - 1].id : null,
    },
});
