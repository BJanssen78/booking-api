import express from "express";
import getAllBookings from "../services/bookings/getAllBookings.js";
import getBookingById from "../services/bookings/getBookingById.js";
import updateBookingById from "../services/bookings/updateBooking.js";
import NotFoundError from "../handlers/notFoundHandler.js";
import createBooking from "../services/bookings/createBooking.js";
import deleteBooking from "../services/bookings/deleteBooking.js";
import authHandler from "../handlers/authHandler.js";

const bookingRouter = express.Router();

bookingRouter.get("/", async (req, res) => {
  //TODO add the query options
  //TEST the query
  const { userId, bookingStatus } = req.params;
  const allBookings = await getAllBookings(userId, bookingStatus);
  res.status(200).json(allBookings);
});

bookingRouter.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const booking = await getBookingById(id);

      res.status(200).json(booking);
    } catch (error) {
      next(error);
    }
  },
  NotFoundError
);

bookingRouter.post("/", authHandler, (req, res) => {
  const {
    userId,
    propertyId,
    totalPrice,
    bookingStatus,
    checkinDate,
    checkoutDate,
    numberOfGuests,
  } = req.body;
  const newBooking = createBooking(
    userId,
    propertyId,
    totalPrice,
    bookingStatus,
    checkinDate,
    checkoutDate,
    numberOfGuests
  );
  res.status(201).json(newBooking);
});

bookingRouter.put(
  "/:id",
  authHandler,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        userId,
        propertyId,
        totalPrice,
        bookingStatus,
        checkinDate,
        checkoutDate,
        numberOfGuests,
      } = req.body;
      const updateBooking = await updateBookingById(
        id,
        userId,
        propertyId,
        totalPrice,
        bookingStatus,
        checkinDate,
        checkoutDate,
        numberOfGuests
      );
      res.status(200).json(updateBooking);
    } catch (error) {
      next(error);
    }
  },
  NotFoundError
);

bookingRouter.delete("/:id", authHandler, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteBookingById = deleteBooking(id);

    res.status(200).json({
      message: `Booking with ID ${deleteBookingById} was deleted`,
    });
  } catch (error) {
    next(error);
  }
});

export default bookingRouter;
