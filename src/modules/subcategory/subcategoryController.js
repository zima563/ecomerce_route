import { subcategoryModel } from "../../../databases/models/subcategoryModel.js";
import {
  addOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../handlers/handler.js";

const addsubcategory = addOne(subcategoryModel);

const getSubcategories = getAll(subcategoryModel);

const getSubcategory = getOne(subcategoryModel);

const updateSubcategory = updateOne(subcategoryModel);

const deleteSubcategory = deleteOne(subcategoryModel);

export {
  addsubcategory,
  getSubcategories,
  getSubcategory,
  updateSubcategory,
  deleteSubcategory,
};
