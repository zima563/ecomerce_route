import { couponModel } from "../../../databases/models/coponModel.js";

import {
  addOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../handlers/handler.js";

const addCoupon = addOne(couponModel);

const getCoupons = getAll(couponModel, "Coupon");

const getCoupon = getOne(couponModel);

const updateCoupon = updateOne(couponModel);

const deleteCoupon = deleteOne(couponModel);

export { addCoupon, getCoupons, getCoupon, updateCoupon, deleteCoupon };
