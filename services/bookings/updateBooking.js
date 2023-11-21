import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../handlers/notFoundHandler.js";

const updateBookingById = async (
  id,
  userId,
  propertyId,
  totalPrice,
  bookingStatus,
  checkinDate,
  checkoutDate,
  numberOfGuests
) => {
  const prisma = new PrismaClient();
  const updateBooking = await prisma.booking.updateMany({
    where: {
      id,
    },
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
  if (!updateBooking || updateBooking.count === 0) {
    throw new NotFoundError("Booking", id);
  }
  return { message: `Booking with id ${id} is updated` };
};
export default updateBookingById;
