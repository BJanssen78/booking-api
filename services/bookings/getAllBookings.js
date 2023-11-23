import { PrismaClient } from "@prisma/client";

const getAllBookings = async (
  userId,
  bookingStatus,
  // checkinDate,
  checkinDateWithoutTime,
  checkoutDate,
  propertyId
) => {
  const prisma = new PrismaClient();
  // let checkinDate = checkinDateWithoutTime + "T23:59:59.999Z";
  console.log(checkinDateWithoutTime);
  // console.log(checkinDate);

  return prisma.booking.findMany({
    where: {
      userId,
      bookingStatus,
      checkinDate: {
        in: [checkinDateWithoutTime],
      },
      checkoutDate,
      propertyId,
    },
  });
};

export default getAllBookings;
