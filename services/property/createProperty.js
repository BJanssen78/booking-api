import { PrismaClient } from "@prisma/client";

const createProperty = async (
  hostId,
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathRoomCount,
  maxGuestCount,
  rating,
  res // pass the response object as a parameter
) => {
  const prisma = new PrismaClient();

  try {
    const property = await prisma.property.create({
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

    // Send a success response
    res.json(property);
  } catch (error) {
    console.error(error);

    // Send an error response
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default createProperty;
