import Joi from "joi";

const addSubcategoryVal = Joi.object({
  name: Joi.string().min(2).max(20),
  category: Joi.string().length(24).hex().required(),
});

const paramsVal = Joi.object({
  id: Joi.string().length(24).hex().required(),
});

const updateSubcategoyVal = Joi.object({
  id: Joi.string().length(24).hex().required(),

  name: Joi.string().min(2).max(20).trim(),
  category: Joi.string().length(24).hex(),
});

export { addSubcategoryVal, paramsVal, updateSubcategoyVal };
