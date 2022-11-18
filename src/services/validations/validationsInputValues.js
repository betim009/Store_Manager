const { idSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INPUT_VALUE', message: error.message };
  return { type: null, message: '' };
};

module.exports = {
  validateId,
};
