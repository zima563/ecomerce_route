import express from "express";
import {
  addCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "./categoryController.js";
import {
  addCategoryVal,
  paramsIdVal,
  updateCategoryVal,
} from "./categoryValidators.js";
import { validation } from "../../middleware/validation.js";
import { uploadSingleFile } from "../../services/fileUpload/upload.js";
import { subcategoryRouter } from "../subcategory/subcategoryRoutes.js";
import { allowedTo, protectRoutes } from "../auth/authControllers.js";

const categoryRouter = express.Router();

categoryRouter.use("/category/subcategories", subcategoryRouter);

categoryRouter
  .route("/")
  .post(
    protectRoutes,
    allowedTo("admin"),
    uploadSingleFile("img"),
    validation(addCategoryVal),
    addCategory
  )
  .get(getCategories);

categoryRouter
  .route("/:id")
  .get(validation(paramsIdVal), getCategory)
  .put(
    protectRoutes,
    allowedTo("admin"),
    uploadSingleFile("img"),
    validation(updateCategoryVal),
    updateCategory
  )
  .delete(
    protectRoutes,
    allowedTo("admin"),
    validation(paramsIdVal),
    deleteCategory
  );

export { categoryRouter };
