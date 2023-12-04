import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../handlers/notFoundHandler.js";

const updateReviewById = async (id, userId, propertyId, rating, comment) => {
  const prisma = new PrismaClient();
  const updateReview = await prisma.review.updateMany({
    where: {
      id,
    },
    data: {
      userId,
      propertyId,
      rating,
      comment,
    },
  });
  if (!updateReview || updateReview.count === 0) {
    throw new NotFoundError("review", id);
  }
  return { message: `review with id ${id} is updated` };
};
export default updateReviewById;
