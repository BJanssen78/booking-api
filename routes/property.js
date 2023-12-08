import express from "express";

// import functions
import createProperty from "../services/property/createProperty.js";
import deleteProperty from "../services/property/deleteProperty.js";
import getAllProperties from "../services/property/getAllProperties.js";
import getPropertyById from "../services/property/getPropertyById.js";
import updatePropertyById from "../services/property/updateProperty.js";

// import handlers
import NotFoundError from "../handlers/notFoundHandler.js";
import authHandler from "../handlers/authHandler.js";

const propertyRouter = express.Router();

propertyRouter.get("/", async (req, res) => {
  const property = await getAllProperties();
  res.status(200).json(property);
});

propertyRouter.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const property = await getPropertyById(id);

      res.status(200).json(property);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      next(error);
    }
  },
  NotFoundError
);

propertyRouter.post("/", authHandler, async (req, res) => {
  const {
    hostId,
    title,
    description,
    location,
    pricePerNight,
    bedroomCount,
    bathRoomCount,
    maxGuestCount,
    rating,
  } = req.body;

  try {
    const newHost = await createProperty(
      hostId,
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
      res
    );
    res.status(201).json(newHost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
});

propertyRouter.put(
  "/:id",
  authHandler,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        hostId,
        title,
        description,
        location,
        pricePerNight,
        bedroomCount,
        bathRoomCount,
        maxGuestCount,
        rating,
      } = req.body;
      const updatePropery = await updatePropertyById(
        id,
        hostId,
        title,
        description,
        location,
        pricePerNight,
        bedroomCount,
        bathRoomCount,
        maxGuestCount,
        rating
      );
      res.status(200).json(updatePropery);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      next(error);
    }
  },
  NotFoundError
);

propertyRouter.delete("/:id", authHandler, async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletePropertyById = await deleteProperty(id);

    res.status(200).json({
      message: `Property with ID ${deletePropertyById} was deleted`,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
});

export default propertyRouter;
