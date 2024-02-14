import Joi from "joi";

const addUserVal = Joi.object({
  name: Joi.string().trim().min(2).required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .required(),
  repassword: Joi.valid(Joi.ref("password")).required(),
  role: Joi.string().valid("admin", "user"),
});

const paramsVal = Joi.object({
  id: Joi.string().length(24).hex(),
});

const updateUserVal = Joi.object({
  id: Joi.string().length(24).hex(),
  // name: Joi.string().trim().min(2),
  // email: Joi.string().trim().email(),
  password: Joi.string().pattern(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  ),
  // role: Joi.string().valid("admin", "user"),
});

export { addUserVal, paramsVal, updateUserVal };
