import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../handlers/notFoundHandler.js";

const updateAmenityById = async (id, name) => {
  const prisma = new PrismaClient();
  const updateAmenity = await prisma.amenity.updateMany({
    where: {
      id,
    },
    data: {
      name,
    },
  });
  if (!updateAmenity || updateAmenity.count === 0) {
    throw new NotFoundError("amenity", id);
  }
  return { message: `amenity with id ${id} is updated` };
};
export default updateAmenityById;
