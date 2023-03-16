const { productsService } = require('../services');

const listProducts = async (_req, res) => {
  const data = await productsService.findAll();
  // console.log(data);
  if (!data) return res.status(404).json(data);
  res.status(200).json(data);
};

const getProducts = async (req, res) => {
  const { id } = req.params;
  const data = await productsService.findById(id);
  if (!data) return res.status(404).send({ message: 'Product not found' });
  return res.status(200).json(data);
};

const createProduct = async (req, res) => {
  const { name } = req.body;

  const data = await productsService.createProduct(name);

  if (!data) return res.status(404).send({ message: 'Impossible Create this product' });
  return res.status(201).json(data);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const data = await productsService.updateProduct(id, name);

  if (!data) return res.status(404).send({ message: 'Product not found' });
  return res.status(200).json(data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const deletedProduct = await productsService.deleteProduct(id);
  if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });

  return res.status(204).end();
};

module.exports = {
  listProducts,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
