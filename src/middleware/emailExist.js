import { userModel } from "../../databases/models/userModel.js";
import { apiError } from "../utils/apiError.js";

export const emailExist = async (req, res, next) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (user) next(new apiError("email already exist", 409));
  next();
};
