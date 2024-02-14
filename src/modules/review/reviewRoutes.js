import express from "express";

import { validation } from "../../middleware/validation.js";
import { allowedTo, protectRoutes } from "../auth/authControllers.js";
import {
  addReviewVal,
  paramsVal,
  updateReviewVal,
} from "./reviewValidators.js";
import {
  addReview,
  deleteReview,
  getReview,
  getReviews,
  updateReview,
} from "./reviewController.js";
import { isReviewExist } from "../../middleware/reviewExist.js";

const reviewRouter = express.Router();

reviewRouter
  .route("/")
  .post(
    protectRoutes,
    allowedTo("user"),
    isReviewExist,
    validation(addReviewVal),
    addReview
  )
  .get(getReviews);

reviewRouter
  .route("/:id")
  .get(validation(paramsVal), getReview)
  .put(
    protectRoutes,
    allowedTo("user"),
    validation(updateReviewVal),
    updateReview
  )
  .delete(
    protectRoutes,
    allowedTo("user", "admin"),
    validation(paramsVal),
    deleteReview
  );

export { reviewRouter };
