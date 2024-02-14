import { couponModel } from "../../databases/models/coponModel.js";
import { apiError } from "../utils/apiError.js";

export const isCouponExist = async (req, res, next) => {
  let isCouponExist = await couponModel.findOne({
    code: req.body.code,
  });
  if (isCouponExist)
    return next(new apiError("you created coupon before", 409));

  next();
};
