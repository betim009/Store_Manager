const { salesService } = require('../services');

const listSales = async (_req, res) => {
  const result = await salesService.findAll();
  return res.status(200).json(result);
};

const getSales = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.findById(Number(id));
  if (type) return res.status(404).send({ message: 'Sale not found' });
  return res.status(200).json(message);
};

const insertProductSale = async (req, res) => {
  const sales = req.body;

  const { status, message } = await salesService.insertProductSale(sales);

  if (status === 201) {
    return res.status(status).json({ id: message, itemsSold: sales });
  }

  return res.status(status).json({ message });
};

module.exports = {
  listSales,
  getSales,
  insertProductSale,
};
