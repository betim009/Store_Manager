const { idSchema, productsSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INPUT_VALUE', message: error.message };
  return { type: null, message: '' };
};

const validateProducts = (name) => {
  const { error } = productsSchema.validate({ name });

  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateProducts,
};
