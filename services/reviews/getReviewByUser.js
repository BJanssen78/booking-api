import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../handlers/notFoundHandler.js";

const getReviewByUser = async (userId) => {
  const prisma = new PrismaClient();
  const reviewsByUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      Reviews: true,
    },
  });
  if (!reviewsByUser || reviewsByUser.lenght === 0) {
    throw new NotFoundError(
      "Incorrect user ID or no bookings where found",
      userId
    );
  }
  return reviewsByUser;
};

export default getReviewByUser;
