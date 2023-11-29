import express from "express";
import getAllUsers from "../services/users/getAllUsers.js";
import getUserById from "../services/users/getUserById.js";
import updateUserById from "../services/users/updateUser.js";
import createUser from "../services/users/createUser.js";
import deleteUser from "../services/users/deleteUser.js";
import NotFoundError from "../handlers/notFoundHandler.js";
import authHandler from "../handlers/authHandler.js";

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  const users = await getAllUsers();
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
      next(error);
    }
  },
  NotFoundError
);

userRouter.post("/", authHandler, (req, res) => {
  const { username, password, name, email, phoneNumber, profilePicture } =
    req.body;
  const newUser = createUser(
    username,
    password,
    name,
    email,
    phoneNumber,
    profilePicture
  );
  res.status(201).json(newUser);
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
    next(error);
  }
});
export default userRouter;
