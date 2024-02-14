import Joi from "joi";

const addCartVal = Joi.object({
  product: Joi.string().length(24).hex(),
  quantity: Joi.number().integer().options({ convert: false }),
});

const paramsVal = Joi.object({
  id: Joi.string().length(24).hex(),
});

const updateQTYVal = Joi.object({
  id: Joi.string().length(24).hex(),
  quantity: Joi.number().required().integer().options({ convert: false }),
});

export { addCartVal, paramsVal, updateQTYVal };
