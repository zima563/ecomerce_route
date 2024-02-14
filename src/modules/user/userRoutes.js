import express from "express";

import { validation } from "../../middleware/validation.js";
import { addUserVal, paramsVal, updateUserVal } from "./userValidators.js";
import {
  addUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "./userController.js";
import { emailExist } from "../../middleware/emailExist.js";
import { allowedTo, protectRoutes } from "../auth/authControllers.js";

const userRouter = express.Router();
// userRouter.use(protectRoutes, allowedTo("admin"));
userRouter
  .route("/")
  .post(validation(addUserVal), emailExist, addUser)
  .get(getUsers);

userRouter
  .route("/:id")
  .get(validation(paramsVal), getUser)
  .put(validation(updateUserVal), updateUser)
  .delete(validation(paramsVal), deleteUser);

export { userRouter };
