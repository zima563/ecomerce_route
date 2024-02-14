import Joi from "joi";

const signupValidator = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  email: Joi.string().pattern(/[A-Za-z0-9]{3,50}@(gmail|yahoo).com$/),
  password: Joi.string().pattern(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  ),
  rePassword: Joi.valid(Joi.ref("password")).required(),
  age: Joi.string().pattern(/^[1-7][0-9]|80$/),
});

const signinValidator = Joi.object({
  email: Joi.string().pattern(/[A-Za-z0-9]{3,50}@(gmail|yahoo).com$/),
  password: Joi.string().pattern(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  ),
});

const forgettingPasswordValidator = Joi.object({
  email: Joi.string().pattern(/^[A-Za-z0-9]{3,50}@(gmail|yahoo).com$/),
});

const checkpinCodeValidator = Joi.object({
  email: Joi.string().pattern(/^[A-Za-z0-9]{3,50}@(gmail|yahoo).com$/),
  pinCode: Joi.string().pattern(/^[0-9][0-9][0-9][0-9]$/),
});

const resetPasswordValidator = Joi.object({
  email: Joi.string().pattern(/^[A-Za-z0-9]{3,50}@(gmail|yahoo).com$/),
  newPassword: Joi.string().pattern(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  ),
});

const changePasswordValidator = Joi.object({
  currentPassword: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .required(),
  newPassword: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .required(),
  reNewPassword: Joi.valid(Joi.ref("newPassword")).required(),
});

export {
  signinValidator,
  signupValidator,
  forgettingPasswordValidator,
  checkpinCodeValidator,
  resetPasswordValidator,
  changePasswordValidator,
};
