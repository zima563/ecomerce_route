import express from "express";
import {
  addToWishList,
  getLoggedUserWishList,
  removeFromWishList,
} from "./wishlistController.js";
import { validation } from "../../middleware/validation.js";
import { addwishListVal, removeFromwishListVal } from "./wishlistValidators.js";
import { allowedTo, protectRoutes } from "../auth/authControllers.js";

const wishListRouter = express.Router();

wishListRouter
  .route("/")
  .patch(
    protectRoutes,
    allowedTo("user"),
    validation(addwishListVal),
    addToWishList
  )
  .get(protectRoutes, allowedTo("user"), getLoggedUserWishList);

wishListRouter
  .route("/:id")
  .delete(
    protectRoutes,
    allowedTo("user", "admin"),
    validation(removeFromwishListVal),
    removeFromWishList
  );

export { wishListRouter };
