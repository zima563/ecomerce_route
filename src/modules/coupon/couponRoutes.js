import express from "express";

import { validation } from "../../middleware/validation.js";
import { isCouponExist } from "../../middleware/couponExist.js";
import { allowedTo, protectRoutes } from "../auth/authControllers.js";
import {
  addCoupon,
  deleteCoupon,
  getCoupon,
  getCoupons,
  updateCoupon,
} from "./couponController.js";
import {
  addCouponVal,
  paramsVal,
  updateCouponVal,
} from "./couponValidators.js";

const couponRouter = express.Router();
couponRouter.use(protectRoutes, allowedTo("admin"));

couponRouter
  .route("/")
  .post(isCouponExist, validation(addCouponVal), addCoupon)
  .get(getCoupons);

couponRouter
  .route("/:id")
  .get(validation(paramsVal), getCoupon)
  .put(isCouponExist, validation(updateCouponVal), updateCoupon)
  .delete(validation(paramsVal), deleteCoupon);

export { couponRouter };
