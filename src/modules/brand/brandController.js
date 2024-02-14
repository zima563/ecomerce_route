import { brandModel } from "../../../databases/models/brandModel.js";
import {
  addOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../handlers/handler.js";

const addBrand = addOne(brandModel);

const getBrands = getAll(brandModel, "brand");

const getBrand = getOne(brandModel);

const updateBrand = updateOne(brandModel);

const deleteBrand = deleteOne(brandModel);

export { addBrand, getBrand, getBrands, updateBrand, deleteBrand };
