import express from "express";
import { allowedTo, protectRoutes } from "../auth/authControllers.js";
import { validation } from "../../middleware/validation.js";
import {
  createCashOrderCartVal,
  createCheckOutSessionsVal,
} from "./orderValidators.js";
import {
  createCashOrderCart,
  createCheckOutSessions,
  getAllOrders,
  getSpecificOrder,
} from "./orderController.js";

const orderRouter = express.Router();

orderRouter
  .route("/:id")
  .post(
    protectRoutes,
    allowedTo("user"),
    validation(createCashOrderCartVal),
    createCashOrderCart
  );
orderRouter
  .route("/checkOut/:id")
  .post(
    protectRoutes,
    allowedTo("user"),
    validation(createCheckOutSessionsVal),
    createCheckOutSessions
  );
orderRouter
  .route("/getSpecificOrder")
  .get(protectRoutes, allowedTo("user"), getSpecificOrder);
orderRouter
  .route("/allOrders")
  .get(protectRoutes, allowedTo("admin"), getAllOrders);

export { orderRouter };
