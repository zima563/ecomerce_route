import express from "express";

import {
  addSubcategoryVal,
  paramsVal,
  updateSubcategoyVal,
} from "./subcategoryValidation.js";
import { validation } from "../../middleware/validation.js";
import {
  addsubcategory,
  getSubcategories,
  getSubcategory,
  updateSubcategory,
  deleteSubcategory,
} from "./subcategoryController.js";
import { allowedTo, protectRoutes } from "../auth/authControllers.js";

const subcategoryRouter = express.Router({ mergeParams: true });

subcategoryRouter
  .route("/")
  .post(
    protectRoutes,
    allowedTo("admin"),
    validation(addSubcategoryVal),
    addsubcategory
  )
  .get(getSubcategories);

subcategoryRouter
  .route("/:id")
  .get(validation(paramsVal), getSubcategory)
  .put(
    protectRoutes,
    allowedTo("admin"),
    validation(updateSubcategoyVal),
    updateSubcategory
  )
  .delete(
    protectRoutes,
    allowedTo("admin"),
    validation(paramsVal),
    deleteSubcategory
  );

export { subcategoryRouter };
