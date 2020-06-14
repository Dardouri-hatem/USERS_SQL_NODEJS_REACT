const Joi = require("@hapi/joi");

function ValidationRegister(data) {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    family_name: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
}

function ValidationLogin(data) {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
}

function ValidationUpdate(data) {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    family_name: Joi.string().min(6).required(),
  });
  return schema.validate(data);
}

module.exports = {
  ValidationRegister,
  ValidationLogin,
};
