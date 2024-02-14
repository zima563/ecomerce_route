import Joi from "joi";

const addCategoryVal = Joi.object({
  name: Joi.string().min(2).max(100).trim().required(),
  image: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string()
      .valid("image/png", "image/jpg", "image/jpeg")
      .required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string().required(),
    size: Joi.number().max(5242880).required(),
  }).required(),
});

const paramsIdVal = Joi.object({
  id: Joi.string().length(24).hex().required(),
});

const updateCategoryVal = Joi.object({
  id: Joi.string().length(24).hex(),

  name: Joi.string().min(2).max(20).trim(),
  image: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string()
      .valid("image/png", "image/jpg", "image/jpeg")
      .required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string().required(),
    size: Joi.number().max(5242880).required(),
  }),
});

export { addCategoryVal, paramsIdVal, updateCategoryVal };
