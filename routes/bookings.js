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
  //[x] add the query options
  //[x] the query

  const { userId, bookingStatus, checkinDate, checkoutDate, propertyId } =
    req.query;
  const allBookings = await getAllBookings(
    userId,
    bookingStatus,
    checkinDate,
    checkoutDate,
    propertyId
  );
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
      res.status(500).json({ error: "Internal Server Error" });
      next(error);
    }
  },
  NotFoundError
);

bookingRouter.post("/", authHandler, async (req, res) => {
  const {
    userId,
    propertyId,
    totalPrice,
    bookingStatus,
    checkinDate,
    checkoutDate,
    numberOfGuests,
  } = req.body;
  try {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
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
      res.status(500).json({ error: "Internal Server Error" });
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
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
});

export default bookingRouter;
