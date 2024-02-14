import Joi from "joi";

const addwishListVal = Joi.object({
  product: Joi.string().length(24).hex().required(),
});

const paramsVal = Joi.object({
  id: Joi.string().length(24).hex().required(),
});

const removeFromwishListVal = Joi.object({
  id: Joi.string().length(24).hex(),
});

export { addwishListVal, paramsVal, removeFromwishListVal };
