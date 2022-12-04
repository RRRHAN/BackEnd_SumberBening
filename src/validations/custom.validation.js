const id = (prefix) => (value, helpers) => {
  // eslint-disable-next-line security/detect-non-literal-regexp
  if (!value.match(new RegExp(`^${prefix}Id-[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$`))) {
    return helpers.message(`"{{#label}}" must be a valid uuid v4 with prefix ${prefix}Id`);
  }
  return value;
};

module.exports = {
  id,
};
