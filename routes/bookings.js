import express from "express";
import getAllBookings from "../services/bookings/getAllBookings.js";
import getBookingById from "../services/bookings/getBookingById.js";
import NotFoundError from "../handlers/notFoundHandler.js";
import createBooking from "../services/bookings/createBooking.js";

const bookingRouter = express.Router();

bookingRouter.get("/", async (req, res) => {
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

bookingRouter.post("/", (req, res) => {
  const {
    userId,
    propertyId,
    checkinDate,
    checkoutDate,
    numberOfGeust,
    totalPrice,
    bookingStatus,
  } = req.body;
  const newBooking = createBooking(
    userId,
    propertyId,
    checkinDate,
    checkoutDate,
    numberOfGeust,
    totalPrice,
    bookingStatus
  );
  res.status(201).json(newBooking);
});

export default bookingRouter;
