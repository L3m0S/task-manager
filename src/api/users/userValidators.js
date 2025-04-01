const Joi = require("joi");

const userValidator = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  email: Joi.string().min(1).max(100).email().required(),
  password: Joi.string().required(),
});

module.exports = {
  userValidator,
};
