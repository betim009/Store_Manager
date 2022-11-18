const { productsModel } = require('../models');
const { validateId } = require('./validations/validationsInputValues');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

const findById = async (productsId) => {
  const error = validateId(productsId);

  if (error.type) return error;

  const products = await productsModel.findById(productsId);
  if (products) return { type: null, message: products };
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

module.exports = {
  findAll,
  findById,
};
