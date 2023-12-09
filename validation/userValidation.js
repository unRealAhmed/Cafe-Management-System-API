const Joi = require('joi');

const userValidationSchema = Joi.object({
  id: Joi.number().integer().message('Invalid ID'),
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.alphanum': 'Name must only contain alphanumeric characters',
      'string.min': 'Name must be at least {#limit} characters long',
      'string.max': 'Name cannot exceed {#limit} characters',
      'any.required': 'Name is required',
    }),
  email: Joi.string()
    .email()
    .max(100)
    .required()
    .messages({
      'string.email': 'Invalid email format',
      'string.max': 'Email cannot exceed {#limit} characters',
      'any.required': 'Email is required',
    }),
  password: Joi.string()
    .min(6)
    .max(255)
    .required()
    .messages({
      'string.min': 'Password must be at least {#limit} characters long',
      'string.max': 'Password cannot exceed {#limit} characters',
      'any.required': 'Password is required',
    }),
  status: Joi.string().valid('active', 'inactive').default('active'),
  role: Joi.string().valid('admin', 'user').default('user'),
  passwordChangedAt: Joi.date(),
  passwordResetToken: Joi.string(),
  passwordResetExpires: Joi.date(),
}).options({ stripUnknown: true });

module.exports = userValidationSchema