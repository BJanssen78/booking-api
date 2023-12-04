import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../handlers/notFoundHandler.js";

const getAllReviews = async () => {
  const prisma = new PrismaClient();

  try {
    const reviews = await prisma.review.findMany();
    return reviews;
  } catch (error) {
    console.log("error fetching all reviews", error);
    throw new NotFoundError(error);
  }
};

export default getAllReviews;
