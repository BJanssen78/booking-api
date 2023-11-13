import { PrismaClient } from "@prisma/client";

const getAllBookings = async (userId, bookingStatus) => {
  const prisma = new PrismaClient();
  console.log(userId);
  console.error(userId);

  return prisma.booking.findMany({
    where: {
      userId,
      bookingStatus,
    },
  });
};

export default getAllBookings;
