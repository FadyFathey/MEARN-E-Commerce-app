const Joi = require('joi');

const categorySchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  description: Joi.string().allow('').max(255),
});

const brandSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  description: Joi.string().allow('').max(255),
});

const productSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().allow('').max(2000),
  price: Joi.number().min(0).required(),
  category: Joi.string().required(),
  brand: Joi.string().required(),
  stock: Joi.number().integer().min(0),
  slug: Joi.string().alphanum().min(2).max(100),
});

const shippingZoneSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().allow('').max(500),
  cities: Joi.array().items(Joi.string()).min(1).required(),
  states: Joi.array().items(Joi.string()),
  countries: Joi.array().items(Joi.string()).default(['US']),
  standardPrice: Joi.number().min(0).required(),
  expressPrice: Joi.number().min(0).required(),
  isActive: Joi.boolean().default(true),
  estimatedDays: Joi.object({
    standard: Joi.number().min(1).default(5),
    express: Joi.number().min(1).default(2),
  }),
});

const orderWithShippingSchema = Joi.object({
  user: Joi.string().required(),
  item: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
        variant: Joi.object({
          color: Joi.string(),
          size: Joi.string(),
        }),
      })
    )
    .min(1)
    .required(),
  address: Joi.array()
    .items(
      Joi.object({
        street: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        country: Joi.string().default('US'),
        postalCode: Joi.string().required(),
        phoneNumber: Joi.string().required(),
      })
    )
    .min(1)
    .required(),
  paymentMode: Joi.string().valid('COD', 'UPI', 'CARD').required(),
  total: Joi.number().min(0).required(),
  couponCode: Joi.string().allow(''),
  shippingType: Joi.string().valid('standard', 'express').default('standard'),
  shippingZoneId: Joi.string().allow(''),
});

function validateCategory(req, res, next) {
  const { error } = categorySchema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });
  next();
}

function validateBrand(req, res, next) {
  const { error } = brandSchema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });
  next();
}

function validateProduct(req, res, next) {
  const { error } = productSchema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });
  next();
}

function validateShippingZone(req, res, next) {
  const { error } = shippingZoneSchema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });
  next();
}

function validateOrderWithShipping(req, res, next) {
  const { error } = orderWithShippingSchema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });
  next();
}

module.exports = {
  validateCategory,
  validateBrand,
  validateProduct,
  validateShippingZone,
  validateOrderWithShipping,
};
