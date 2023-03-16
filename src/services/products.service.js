const { productsModel } = require('../models');

const findAll = async () => {
  const products = await productsModel.findAll();
  return products;
};

const findById = async (productsId) => {
  const product = await productsModel.findById(productsId);
  return product;
};

const createProduct = async (name) => {
  const CreateProductByName = await productsModel.insert(name);
  const newProduct = await productsModel.findById(CreateProductByName);

  return newProduct;
};

const updateProduct = async (id, name) => {
  const updtProduct = await productsModel.update(id, name);
  const product = await productsModel.findById(id);
  if (updtProduct) return product;
};

const deleteProduct = async (id) => {
  const existingProduct = await productsModel.findById(id);
  if (!existingProduct) {
    return null;
  }
  await productsModel.deleteById(id);
  return existingProduct;
};

module.exports = {
  findAll,
  findById,
  createProduct,
  updateProduct,
  deleteProduct,
};
