import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../handlers/notFoundHandler.js";

//TEST test the update function

const updateBookingById = async (
  id,
  userId,
  propertyId,
  totalPrice,
  bookingStatus,
  checkinDate,
  checkoutDate,
  numberOfGeust
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
      numberOfGeust,
    },
  });
  if (!updateBooking || updateBooking.count === 0) {
    throw new NotFoundError("Booking", id);
  }
  return { message: `Booking with id ${id} is updated` };
};
export default updateBookingById;
