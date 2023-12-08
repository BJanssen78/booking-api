import express from "express";

// import functions
import getAllAmenities from "../services/amenity/getAllAmenities.js";
import getAmenityById from "../services/amenity/getAmenityById.js";
import createAmenity from "../services/amenity/createAmenity.js";
import updateAmenityById from "../services/amenity/updateAmenity.js";
import deleteAmenity from "../services/amenity/deleteAmenity.js";

// import handlers
import NotFoundError from "../handlers/notFoundHandler.js";
import authHandler from "../handlers/authHandler.js";

const amenityRouter = express.Router();

amenityRouter.get("/", async (req, res) => {
  const host = await getAllAmenities();
  res.status(200).json(host);
});

amenityRouter.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const host = await getAmenityById(id);

      res.status(200).json(host);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      next(error);
    }
  },
  NotFoundError
);

amenityRouter.post("/", authHandler, async (req, res) => {
  const { name } = req.body;

  try {
    const newAmenity = await createAmenity(name, res);
    res.status(201).json(newAmenity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
});

amenityRouter.put(
  "/:id",
  authHandler,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const updateAmenity = await updateAmenityById(id, name);
      res.status(200).json(updateAmenity);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      next(error);
    }
  },
  NotFoundError
);

amenityRouter.delete("/:id", authHandler, async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteAmenityById = await deleteAmenity(id);

    res.status(200).json({
      message: `Amenity with ID ${id} was deleted, ${deleteAmenityById}`,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
});

export default amenityRouter;
