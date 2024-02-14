import Joi from "joi";

const addReviewVal = Joi.object({
  text: Joi.string().min(1).max(200).trim().required(),
  rate: Joi.number().min(0).max(5).required(),
  product: Joi.string().length(24).hex().required(),
});

const paramsVal = Joi.object({
  id: Joi.string().length(24).hex().required(),
});

const updateReviewVal = Joi.object({
  id: Joi.string().length(24).hex().required(),

  text: Joi.string().min(1).max(200).trim(),
  rate: Joi.number().min(0).max(5),
  product: Joi.string().length(24).hex(),
});

export { addReviewVal, paramsVal, updateReviewVal };
