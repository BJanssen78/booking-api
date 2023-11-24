import { PrismaClient } from "@prisma/client";

const getAllBookings = async (
  userId,
  bookingStatus,
  checkinDateWithoutTime,
  checkoutDate,
  propertyId
) => {
  const prisma = new PrismaClient();

  return prisma.booking.findMany({
    where: {
      userId,
      bookingStatus,
      checkinDate: { in: Date[checkinDateWithoutTime] },
      checkoutDate,
      propertyId,
    },
  });
};

export default getAllBookings;
