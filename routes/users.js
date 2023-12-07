import express from "express";
import getAllUsers from "../services/users/getAllUsers.js";
import getUserById from "../services/users/getUserById.js";
import updateUserById from "../services/users/updateUser.js";
import createUser from "../services/users/createUser.js";
import deleteUser from "../services/users/deleteUser.js";
import NotFoundError from "../handlers/notFoundHandler.js";
import authHandler from "../handlers/authHandler.js";
import getBookingsByUser from "../services/bookings/getbookingsByUser.js";
import getReviewByUser from "../services/reviews/getReviewByUser.js";

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  const { username, email } = req.query;
  const users = await getAllUsers(username, email);
  res.status(200).json(users);
});

userRouter.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await getUserById(id);

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      next(error);
    }
  },
  NotFoundError
);

userRouter.get(
  "/:id/booking",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const bookingsByUser = await getBookingsByUser(id);
      res.status(200).json(bookingsByUser);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  NotFoundError
);

userRouter.get(
  "/:id/review",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const reviewsByUser = await getReviewByUser(id);
      res.status(200).json(reviewsByUser);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  NotFoundError
);

userRouter.post("/", authHandler, async (req, res) => {
  const { username, password, name, email, phoneNumber, profilePicture } =
    req.body;
  try {
    const newUser = createUser(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture
    );
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
});

userRouter.put(
  "/:id",
  authHandler,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { username, password, name, email, phoneNumber, pictureUrl } =
        req.body;
      const updateUser = await updateUserById(
        id,
        username,
        password,
        name,
        email,
        phoneNumber,
        pictureUrl
      );
      res.status(200).json(updateUser);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      next(error);
    }
  },
  NotFoundError
);

userRouter.delete("/:id", authHandler, async (req, res, next) => {
  try {
    const { id } = req.params;

    //FIXME deleteUserById message
    const deleteUserById = deleteUser(id);

    res.status(200).json({
      message: `User with ID ${id} was deleted`,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
});
export default userRouter;
