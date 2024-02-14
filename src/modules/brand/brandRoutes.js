import express from "express";

import { addBrandVal, paramsVal, updateBrandVal } from "./brandValidators.js";
import { validation } from "../../middleware/validation.js";
import {
  addBrand,
  deleteBrand,
  getBrand,
  getBrands,
  updateBrand,
} from "./brandController.js";
import { uploadSingleFile } from "../../services/fileUpload/upload.js";
import { allowedTo, protectRoutes } from "../auth/authControllers.js";

const brandRouter = express.Router();

brandRouter
  .route("/")
  .post(
    protectRoutes,
    allowedTo("admin"),
    uploadSingleFile("logo"),
    validation(addBrandVal),
    addBrand
  )
  .get(getBrands);

brandRouter
  .route("/:id")
  .get(validation(paramsVal), getBrand)
  .put(
    protectRoutes,
    allowedTo("admin"),
    uploadSingleFile("logo"),
    validation(updateBrandVal),
    updateBrand
  )
  .delete(
    protectRoutes,
    allowedTo("admin"),
    validation(paramsVal),
    deleteBrand
  );

export { brandRouter };
