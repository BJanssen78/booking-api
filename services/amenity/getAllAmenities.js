import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../handlers/notFoundHandler.js";

const getAllAmenities = async () => {
  const prisma = new PrismaClient();

  try {
    const amenities = await prisma.amenity.findMany();
    return amenities;
  } catch (error) {
    console.log("error fetching all amenities", error);
    throw new NotFoundError(error);
  }
};

export default getAllAmenities;
