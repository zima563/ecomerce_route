import Joi from "joi";

const addBrandVal = Joi.object({
  name: Joi.string().min(2).max(20),
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

const paramsVal = Joi.object({
  id: Joi.string().length(24).hex(),
});

const updateBrandVal = Joi.object({
  id: Joi.string().length(24).hex().required(),
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

  name: Joi.string().min(2).max(20),
});

export { addBrandVal, paramsVal, updateBrandVal };
