import express from "express";
import getAllHosts from "../services/hosts/getAllHosts.js";
import getHostById from "../services/hosts/getHostById.js";
import createHost from "../services/hosts/createHost.js";
import updateHostById from "../services/hosts/updateHost.js";
import deleteHost from "../services/hosts/deleteHost.js";
import NotFoundError from "../handlers/notFoundHandler.js";
import authHandler from "../handlers/authHandler.js";

const hostRouter = express.Router();

hostRouter.get("/", async (req, res) => {
  const host = await getAllHosts();
  res.status(200).json(host);
});

hostRouter.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const host = await getHostById(id);

      res.status(200).json(host);
    } catch (error) {
      next(error);
    }
  },
  NotFoundError
);

hostRouter.post("/", authHandler, (req, res) => {
  const {
    username,
    password,
    name,
    email,
    phoneNumber,
    profilePicture,
    aboutMe,
  } = req.body;
  const newHost = createHost(
    username,
    password,
    name,
    email,
    phoneNumber,
    profilePicture,
    aboutMe
  );
  res.status(201).json(newHost);
});

hostRouter.put(
  "/:id",
  authHandler,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe,
      } = req.body;
      const updateUser = await updateHostById(
        id,
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe
      );
      res.status(200).json(updateUser);
    } catch (error) {
      next(error);
    }
  },
  NotFoundError
);

hostRouter.delete("/:id", authHandler, async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteHostById = deleteHost(id); //FIXME result in postman with [object promise]

    res.status(200).json({
      message: `Host with ID ${id} was deleted, ${deleteHostById}`,
    });
  } catch (error) {
    next(error);
  }
});

export default hostRouter;
