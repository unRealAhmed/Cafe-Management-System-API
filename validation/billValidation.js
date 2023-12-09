const Joi = require('joi');

const billValidationSchema = Joi.object({
  id: Joi.number().integer().required(),
  uuid: Joi.string().max(200).required(),
  name: Joi.string().max(255).required().messages({
    'string.max': 'Name cannot exceed {#limit} characters',
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().max(255).required().messages({
    'string.email': 'Invalid email format',
    'string.max': 'Email cannot exceed {#limit} characters',
    'any.required': 'Email is required',
  }),
  paymentMethod: Joi.string().max(50).required().messages({
    'string.max': 'Payment method cannot exceed {#limit} characters',
    'any.required': 'Payment method is required',
  }),
  total: Joi.number().integer().required().messages({
    'number.base': 'Total must be a number',
    'any.required': 'Total is required',
  }),
  productDetails: Joi.object().default(null),
}).options({ stripUnknown: true });

module.exports = billValidationSchema;
