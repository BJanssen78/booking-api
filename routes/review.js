import express from "express";

// import functions
import getAllReviews from "../services/reviews/getAllReviews.js";
import getReviewById from "../services/reviews/getReviewById.js";
import createReview from "../services/reviews/createReview.js";
import updateReviewById from "../services/reviews/updateReview.js";
import deleteReview from "../services/reviews/deleteReview.js";

// import handlers
import NotFoundError from "../handlers/notFoundHandler.js";
import authHandler from "../handlers/authHandler.js";

const reviewRouter = express.Router();

reviewRouter.get("/", async (req, res) => {
  const review = await getAllReviews();
  res.status(200).json(review);
});

reviewRouter.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const review = await getReviewById(id);

      res.status(200).json(review);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      next(error);
    }
  },
  NotFoundError
);

reviewRouter.post("/", authHandler, async (req, res) => {
  const { userId, propertyId, rating, comment } = req.body;

  try {
    const newReview = await createReview(
      userId,
      propertyId,
      rating,
      comment,
      res
    );
    res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
});

reviewRouter.put(
  "/:id",
  authHandler,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { userId, propertyId, rating, comment } = req.body;
      const updateReview = await updateReviewById(
        id,
        userId,
        propertyId,
        rating,
        comment,
        rating
      );
      res.status(200).json(updateReview);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      next(error);
    }
  },
  NotFoundError
);

reviewRouter.delete("/:id", authHandler, async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteReviewById = await deleteReview(id);

    res.status(200).json({
      message: `Review with ID ${deleteReviewById} was deleted`,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
});

export default reviewRouter;
