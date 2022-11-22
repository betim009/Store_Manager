const { salesModel } = require('../models');
const { validateId } = require('./validations/validationsInputValues');

const findAll = async () => {
  const result = await salesModel.findAll();
  return result;
};

const findById = async (id) => {
  const error = validateId(id);

  if (error.type) return error;

  const sales = await salesModel.findById(id);

  if (!sales.length) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: sales };
};

module.exports = {
  findAll,
  findById,
};
