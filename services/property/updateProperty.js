import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../handlers/notFoundHandler.js";

const updatePropertyById = async (
  id,
  hostId,
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathRoomCount,
  maxGuestCount,
  rating
) => {
  const prisma = new PrismaClient();
  const updatePropery = await prisma.property.updateMany({
    where: {
      id,
    },
    data: {
      hostId,
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
    },
  });
  if (!updatePropery || updatePropery.count === 0) {
    throw new NotFoundError("Property", id);
  }
  return { message: `Property with id ${id} is updated` };
};
export default updatePropertyById;
