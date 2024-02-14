import Joi from "joi";

const addProductVal = Joi.object({
  title: Joi.string().min(2).max(20).required().trim(),
  description: Joi.string().trim().required().min(2).max(50),
  quantity: Joi.number().optional().min(0),
  price: Joi.number().required().min(0),
  priceAfterDiscount: Joi.number().optional(),
  category: Joi.string().length(24).hex().required(),
  subcategory: Joi.string().length(24).hex().required(),
  brand: Joi.string().length(24).hex().required(),

  imgCover: Joi.array()
    .items(
      Joi.object({
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
      })
    )
    .required(),

  images: Joi.array()
    .items(
      Joi.object({
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
      })
    )
    .required(),
});

const paramsVal = Joi.object({
  id: Joi.string().length(24).hex().required(),
});

const updateProductVal = Joi.object({
  id: Joi.string().length(24).hex().required(),

  title: Joi.string().min(2).max(20).optional().trim(),
  description: Joi.string().trim().optional().min(2).max(50),
  quantity: Joi.number().optional().min(0),
  price: Joi.number().min(0),
  priceAfterDiscount: Joi.number().optional(),
  category: Joi.string().length(24).hex(),
  subcategory: Joi.string().length(24).hex(),
  brand: Joi.string().length(24).hex(),
  imgCover: Joi.array().items(
    Joi.object({
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
    })
  ),

  images: Joi.array().items(
    Joi.object({
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
    })
  ),
});

export { addProductVal, paramsVal, updateProductVal };
