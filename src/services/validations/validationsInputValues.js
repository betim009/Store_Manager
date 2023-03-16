const { productsSchema } = require('./schemas');

const validateProducts = (name) => {
  const { error } = productsSchema.validate({ name });

  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

module.exports = {
  validateProducts,
};
