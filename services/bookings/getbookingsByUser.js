import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../handlers/notFoundHandler.js";

const getBookingsByUser = async (userId) => {
  const prisma = new PrismaClient();
  const bookingsByUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      Booking: true,
    },
  });
  if (!bookingsByUser || bookingsByUser.lenght === 0) {
    throw new NotFoundError(
      "Incorrect user ID or no bookings where found",
      userId
    );
  }
  return bookingsByUser;
};

export default getBookingsByUser;
