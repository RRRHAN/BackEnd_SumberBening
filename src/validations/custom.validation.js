const Joi = require('joi');
const { allowedMimetype } = require('../config/commons');

const id = (prefix) => (value, helpers) => {
  // eslint-disable-next-line security/detect-non-literal-regexp
  if (!value.match(new RegExp(`^${prefix}Id-[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$`))) {
    return helpers.message(`"{{#label}}" must be a valid uuid v4 with prefix ${prefix}Id`);
  }
  return value;
};

const images = (fieldname) => (value, helpers) => {
  const schema = Joi.object()
    .optional()
    .keys({
      fieldname: Joi.string().valid(fieldname).required(),
      originalname: Joi.string(),
      encoding: Joi.string(),
      mimetype: Joi.string()
        .required()
        .valid(...allowedMimetype),
      buffer: Joi.object(),
      size: Joi.number(),
    });
  const validate = schema.validate(value);
  if (validate.error) {
    return helpers.message(validate.error.details[0].message);
  }

  return value;
};

module.exports = {
  id,
  images,
};
