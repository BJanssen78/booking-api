import { PrismaClient } from "@prisma/client";

const createBooking = async (
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGeust,
  totalPrice,
  bookingStatus
) => {
  const prisma = new PrismaClient();

  return prisma.booking.create({
    data: {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGeust,
      totalPrice,
      bookingStatus,
    },
  });
};

export default createBooking;
