import { categoryModel } from "../../../databases/models/categoryModel.js";
import {
  addOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../handlers/handler.js";

const addCategory = addOne(categoryModel);

const getCategories = getAll(categoryModel, "category");

const getCategory = getOne(categoryModel);

const updateCategory = updateOne(categoryModel);

const deleteCategory = deleteOne(categoryModel);

export {
  addCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
