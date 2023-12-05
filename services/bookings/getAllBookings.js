import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../handlers/notFoundHandler.js";

//set a date validation, to make it possible to search on date only
const isValidDate = (dateString) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString);
};

const getAllBookings = async (
  userId,
  bookingStatus,
  checkinDateWithoutTime,
  checkoutDateWithoutTime,
  propertyId
) => {
  const prisma = new PrismaClient();

  // Validate the date format only if a date is provided
  if (checkinDateWithoutTime && !isValidDate(checkinDateWithoutTime)) {
    return {
      status: 404,
      message: `Invalid checkinDate format. Use the format 'YYYY-MM-DD'.`,
    };
  }

  if (checkoutDateWithoutTime && !isValidDate(checkoutDateWithoutTime)) {
    return {
      status: 404,
      message: `Invalid checkoutDate format. Use the format 'YYYY-MM-DD'.`,
    };
  }

  // check if the date's are provided (True) if not, then null is provided
  const checkinDate = checkinDateWithoutTime
    ? new Date(checkinDateWithoutTime)
    : null;
  const checkoutDate = checkoutDateWithoutTime
    ? new Date(checkoutDateWithoutTime)
    : null;

  try {
    const result = await prisma.booking.findFirst({
      where: {
        userId,
        bookingStatus,
        checkinDate: checkinDate
          ? {
              // check the date equal or greater and equal and lower, so the entire day will be selected, else undefined.
              gte: new Date(
                checkinDate.toISOString().split("T")[0] + "T00:00:00.000Z"
              ),
              lt: new Date(
                checkinDate.toISOString().split("T")[0] + "T23:59:59.999Z"
              ),
            }
          : undefined,
        checkoutDate: checkoutDate
          ? {
              // check the date equal or greater and equal and lower, so the entire day will be selected, else undefined.
              gte: new Date(
                checkoutDate.toISOString().split("T")[0] + "T00:00:00.000Z"
              ),
              lt: new Date(
                checkoutDate.toISOString().split("T")[0] + "T23:59:59.999Z"
              ),
            }
          : undefined,
        propertyId,
      },
    });
    if (result.length === 0) {
      return {
        status: 404,
        message: "No match found with these parameter(s)",
      };
    }

    return result;
  } catch (error) {
    throw new NotFoundError(
      `Incorrect date provided, use the format yyyy-mm-dd. ${error}`
    );
  }
};

export default getAllBookings;
