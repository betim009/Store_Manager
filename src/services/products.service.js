const { productsModel } = require('../models');
const { validateId, validateProducts } = require('./validations/validationsInputValues');

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

const createProduct = async (name) => {
  const error = validateProducts(name);
  if (error.type) return error;

  const newProductId = await productsModel.insert(name);
  const newProduct = await productsModel.findById(newProductId);

  return { type: null, message: newProduct };
};

const updateProduct = async (id, name) => {
  const productExist = await productsModel.findById(id);
  if (!productExist) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  await productsModel.update(id, name);
  return { type: null, message: { id, name } };
};

module.exports = {
  findAll,
  findById,
  createProduct,
  updateProduct,
};
