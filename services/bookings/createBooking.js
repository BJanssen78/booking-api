import { PrismaClient } from "@prisma/client";

const createBooking = async (
  userId,
  propertyId,
  totalPrice,
  bookingStatus,
  checkinDate,
  checkoutDate,
  numberOfGuests
) => {
  const prisma = new PrismaClient();

  return prisma.booking.create({
    data: {
      userId,
      propertyId,
      totalPrice,
      bookingStatus,
      checkinDate,
      checkoutDate,
      numberOfGuests,
    },
  });
};

export default createBooking;
