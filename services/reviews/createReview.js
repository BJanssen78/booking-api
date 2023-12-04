import { PrismaClient } from "@prisma/client";

const createReview = async (userId, propertyId, rating, comment) => {
  const prisma = new PrismaClient();

  // Check if rating is entered, and value is between 1 and 5
  //   const checkRatingValue = (rating) => {
  if (!rating || rating <= 1 || rating >= 5) {
    return {
      status: 404,
      message:
        "Invalid number, or no number is entered, please enter a value between 1 and 5",
    };
  }
  //   }

  return prisma.review.create({
    data: {
      userId,
      propertyId,
      rating,
      comment,
    },
  });
};

export default createReview;
