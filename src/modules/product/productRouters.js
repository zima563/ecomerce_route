import express from "express";

import {
  addProductVal,
  paramsVal,
  updateProductVal,
} from "./productValidators.js";
import { validation } from "../../middleware/validation.js";
import {
  addProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "./productController.js";
import { uploadFieldsOfFiles } from "../../services/fileUpload/upload.js";
import { allowedTo, protectRoutes } from "../auth/authControllers.js";

const productRouter = express.Router();

productRouter
  .route("/")
  .post(
    protectRoutes,
    allowedTo("admin"),
    uploadFieldsOfFiles([
      { name: "imgCover", maxCounts: 1 },
      { name: "images", maxCounts: 10 },
    ]),
    validation(addProductVal),
    addProduct
  )
  .get(getProducts);

productRouter
  .route("/:id")
  .get(validation(paramsVal), getProduct)
  .put(
    protectRoutes,
    allowedTo("admin"),
    uploadFieldsOfFiles([
      { name: "imgCover", maxCounts: 1 },
      { name: "images", maxCounts: 10 },
    ]),
    validation(updateProductVal),
    updateProduct
  )
  .delete(
    protectRoutes,
    allowedTo("admin"),
    validation(paramsVal),
    deleteProduct
  );

export { productRouter };
