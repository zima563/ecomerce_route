import { productModel } from "../../../databases/models/productModel.js";
import {
  addOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../handlers/handler.js";

const addProduct = addOne(productModel);

const getProducts = getAll(productModel, "product");

const getProduct = getOne(productModel);

const updateProduct = updateOne(productModel);

const deleteProduct = deleteOne(productModel);

export { addProduct, getProduct, getProducts, updateProduct, deleteProduct };
