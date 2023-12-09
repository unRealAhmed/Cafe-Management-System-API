const Joi = require('joi');

const productValidationSchema = Joi.object({
  id: Joi.number().integer(),
  name: Joi.string().alphanum().max(255).required().messages({
    'string.alphanum': 'Product name must only contain alphanumeric characters',
    'string.max': 'Product name cannot exceed {#limit} characters',
    'any.required': 'Product name is required',
  }),
  categoryID: Joi.number().integer().required().messages({
    'number.base': 'Category ID must be a number',
    'any.required': 'Category ID is required',
  }),
  description: Joi.string().max(255).messages({
    'string.max': 'Description cannot exceed {#limit} characters',
  }),
  price: Joi.number().integer().messages({
    'number.base': 'Price must be a number',
  }),
  status: Joi.string().max(20).messages({
    'string.max': 'Status cannot exceed {#limit} characters',
  }),
}).options({ stripUnknown: true });

module.exports = productValidationSchema;
