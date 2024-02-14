import Joi from "joi";

const addAddresstVal = Joi.object({
  street: Joi.string().trim().min(2).required(),
  phone: Joi.string().trim().min(2).required(),
  city: Joi.string().trim().min(2).required(),
});

const removeFromAddresstVal = Joi.object({
  id: Joi.string().length(24).hex(),
});

export { addAddresstVal, removeFromAddresstVal };
