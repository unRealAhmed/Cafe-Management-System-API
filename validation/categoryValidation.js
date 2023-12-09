const Joi = require('joi');

const categoryValidationSchema = Joi.object({
  id: Joi.number().integer(),
  name: Joi.string().alphanum().max(255).required().messages({
    'string.alphanum': 'Category name must only contain alphanumeric characters',
    'string.max': 'Category name cannot exceed {#limit} characters',
    'any.required': 'Category name is required',
  }),
}).options({ stripUnknown: true });

module.exports = categoryValidationSchema;
