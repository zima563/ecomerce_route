import Joi from "joi";

const addCouponVal = Joi.object({
  code: Joi.string().min(1).max(200).trim().required(),
  discount: Joi.number().min(0).required(),
  expire: Joi.date().required(),
});

const paramsVal = Joi.object({
  id: Joi.string().length(24).hex().required(),
});

const updateCouponVal = Joi.object({
  id: Joi.string().length(24).hex().required(),

  code: Joi.string().min(1).max(200).trim(),
  discount: Joi.number().min(0),
  expire: Joi.date(),
});

export { addCouponVal, paramsVal, updateCouponVal };
