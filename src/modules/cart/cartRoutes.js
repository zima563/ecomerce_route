import express from "express";
import { allowedTo, protectRoutes } from "../auth/authControllers.js";
import { validation } from "../../middleware/validation.js";
import { addCartVal, paramsVal, updateQTYVal } from "./cartValidators.js";
import {
  addToCart,
  applyCoupon,
  clearUserCart,
  getLoggedUserCart,
  removeItemFromCart,
  updateQTY,
} from "./cartController.js";

const cartRouter = express.Router();

cartRouter
  .route("/")
  .post(protectRoutes, allowedTo("user"), validation(addCartVal), addToCart)
  .get(protectRoutes, allowedTo("user"), getLoggedUserCart)
  .delete(protectRoutes, allowedTo("user"), clearUserCart);

cartRouter
  .route("/applyCoupon")
  .post(protectRoutes, allowedTo("user"), applyCoupon);
cartRouter
  .route("/:id")
  .put(protectRoutes, allowedTo("user"), validation(updateQTYVal), updateQTY)
  .delete(
    protectRoutes,
    allowedTo("user", "admin"),
    validation(paramsVal),
    removeItemFromCart
  );

export { cartRouter };
