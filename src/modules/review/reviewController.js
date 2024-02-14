import { reviewModel } from "../../../databases/models/reviewModel.js";
import {
  addOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../handlers/handler.js";

const addReview = addOne(reviewModel);

const getReviews = getAll(reviewModel, "review");

const getReview = getOne(reviewModel);

const updateReview = updateOne(reviewModel);

const deleteReview = deleteOne(reviewModel);

export { addReview, getReviews, getReview, updateReview, deleteReview };
