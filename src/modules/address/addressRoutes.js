import express from "express";

import { validation } from "../../middleware/validation.js";
import { addAddresstVal, removeFromAddresstVal } from "./addressValidators.js";
import {
  addToAddress,
  getLoggedUserAddresses,
  removeFromaddress,
} from "./addressController.js";
import { allowedTo, protectRoutes } from "../auth/authControllers.js";

const addressRouter = express.Router();

addressRouter
  .route("/")
  .patch(
    protectRoutes,
    allowedTo("user"),
    validation(addAddresstVal),
    addToAddress
  )
  .get(protectRoutes, allowedTo("user"), getLoggedUserAddresses);

addressRouter
  .route("/:id")
  .delete(
    protectRoutes,
    allowedTo("user", "admin"),
    validation(removeFromAddresstVal),
    removeFromaddress
  );

export { addressRouter };
