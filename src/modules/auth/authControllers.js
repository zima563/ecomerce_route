import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import randomstring from "randomstring";

import { catchError } from "../../middleware/catchError.js";
import { userModel } from "../../../databases/models/userModel.js";
import { apiError } from "../../utils/apiError.js";
import { sendEmailPcode } from "../../services/email/sendEmailPinCode.js";

const signup = catchError(async (req, res, next) => {
  let user = new userModel(req.body);
  await user.save();
  let token = Jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_KEY
  );
  res.json({ msg: "success", token });
});

const signin = catchError(async (req, res, next) => {
  let user = await userModel.findOne({ email: req.body.email });

  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    let token = Jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_KEY
    );
    return res.json({ msg: "success", token });
  }
  next(new apiError("email or password incorrect", 401));
});

const forgettingPassword = catchError(async (req, res, next) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (!user) return next(new apiError("not found email", 404));
  const pinCode = randomstring.generate({ length: 4, charset: "numeric" });
  user.pinCode = pinCode;
  user.resetVerified = false;

  await user.save();
  sendEmailPcode(user.email, user.pinCode);

  res.json({ msg: "send of message successfully" });
});

const checkpinCode = catchError(async (req, res, next) => {
  let user = await userModel.findOne({
    email: req.body.email,
    pinCode: req.body.pinCode,
  });
  if (!user) {
    user.pinCode = undefined;
    user.resetVerified = undefined;
    await user.save();
    next(new apiError("email or pinCode incorrect"));
  } else {
    user.pinCode = undefined;
    user.resetVerified = true;
    await user.save();
    res.json({ msg: "verification of pinCode is successfully" });
  }
});

const resetPassword = catchError(async (req, res, next) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (!user) return next(new apiError("not found email", 404));
  if (!user.resetVerified) return next(new apiError("reset code not verify"));
  user.pinCode = undefined;
  user.resetVerified = undefined;
  user.password = req.body.newPassword;
  await user.save();
  let token = Jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_KEY
  );

  res.status(200).json({ msg: "reset password is success ", token });
});

const changePassword = catchError(async (req, res, next) => {
  let user = await userModel.findById(req.user._id);
  if (user && bcrypt.compareSync(req.body.currentPassword, user.password)) {
    let token = Jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_KEY
    );
    await userModel.findByIdAndUpdate(req.user._id, {
      password: req.body.newPassword,
      passwordChangedAt: Date.now(),
    });
    return res.json({ msg: "success", token });
  }

  next(new apiError("password incorrect", 401));
});

const logout = catchError(async (req, res, next) => {
  await userModel.findByIdAndUpdate(req.user._id, {
    logoutAt: Date.now(),
    isActive: false,
  });
  res.status(200).json({ msg: "you logOut successfuly" });
});

const protectRoutes = catchError(async (req, res, next) => {
  let { token } = req.headers;

  if (!token) return next(new apiError("not token provide", 401));

  let decoded = Jwt.verify(token, process.env.JWT_KEY);
  let user = await userModel.findById(decoded.userId);
  if (!user) return next(new apiError("user not founnd"));

  if (user.passwordChangedAt) {
    let timeOfChangePassword = parseInt(user?.passwordChangedAt / 1000);
    if (timeOfChangePassword > decoded.iat)
      return next(new apiError("invalid token..please login", 401));
  }
  if (user.logoutAt) {
    let timeOflogout = parseInt(user?.logoutAt / 1000);
    if (timeOflogout > decoded.iat)
      return next(new apiError("invalid token..please login", 401));
  }
  req.user = user;
  next();
});

const allowedTo = (...roles) => {
  return catchError(async (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new apiError("you are not authorized", 401));

    next();
  });
};
export {
  signin,
  signup,
  forgettingPassword,
  checkpinCode,
  resetPassword,
  protectRoutes,
  changePassword,
  allowedTo,
  logout,
};
