const Joi = require("joi");

const taskValidator = Joi.object({
  title: Joi.string().min(1).max(50).required(),
  description: Joi.string().min(1).max(500).required(),
  status: Joi.string().valid("TODO", "IN_PROGRESS", "DONE"),
});

const pageableQueryOptions = Joi.object({
  limit: Joi.number().min(0).max(100),
  offset: Joi.number().min(0),
});

module.exports = { taskValidator, pageableQueryOptions };
