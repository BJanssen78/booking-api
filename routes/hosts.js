import express from "express";

// import functions
import getAllHosts from "../services/hosts/getAllHosts.js";
import getHostById from "../services/hosts/getHostById.js";
import createHost from "../services/hosts/createHost.js";
import updateHostById from "../services/hosts/updateHost.js";
import deleteHost from "../services/hosts/deleteHost.js";

// import handlers
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
      res.status(500).json({ error: "Internal Server Error" });
      next(error);
    }
  },
  NotFoundError
);

hostRouter.post("/", authHandler, async (req, res) => {
  const {
    username,
    password,
    name,
    email,
    phoneNumber,
    profilePicture,
    aboutMe,
  } = req.body;

  try {
    const newHost = await createHost(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
      res
    );
    res.status(201).json(newHost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
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
      res.status(500).json({ error: "Internal Server Error" });
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
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
});

export default hostRouter;
