import express from "express";
import getAllUsers from "../services/users/getAllUsers.js";
// import NotFoundError from "../handlers/notFoundHandler.js";

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  const users = await getAllUsers();
  res.status(200).json(users);
});

export default userRouter;
