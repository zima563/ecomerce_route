import { reviewModel } from "../../databases/models/reviewModel.js";
import { apiError } from "../utils/apiError.js";

export const isReviewExist = async (req, res, next) => {
  let isReviewExist = await reviewModel.findOne({
    user: req.user._id,
    product: req.body.product,
  });
  if (isReviewExist)
    return next(new apiError("you created review before", 409));

  next();
};
