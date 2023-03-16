const { salesModel } = require('../models');
const { productsModel } = require('../models');

const findAll = async () => {
  const result = await salesModel.findAll();
  return result;
};

const findById = async (id) => {
  const sales = await salesModel.findById(id);

  if (!sales.length) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: sales };
};

// Esta função insere uma nova venda, juntamente com seus produtos, no banco de dados.
const insertProductSale = async (sales) => {
  // Verifica se os IDs dos produtos passados na venda existem no banco de dados
  const verificaId = await Promise.all(sales
    .map((sale) => productsModel.findById(sale.productId)));
  const result = verificaId.every((productId) => productId !== undefined && productId !== null);

  // Se algum ID de produto passado não existir no banco, retorna um erro 404
  if (!result) {
    return { status: 404, message: 'Product not found' };
  }

  // Cria um array com objetos contendo o ID e a quantidade de cada produto vendido
  const saleProducts = sales
    .map((sale) => ({ productId: sale.productId, quantity: sale.quantity }));

  // Insere a venda no banco de dados, juntamente com os produtos vendidos
  const saleId = await salesModel.insertSaleWithProducts({ products: saleProducts });

  // Retorna uma mensagem de sucesso com o ID da venda criada
  console.log(saleId);
  // return saleId;
  return { status: 201, message: saleId };
};

module.exports = {
  findAll,
  findById,
  insertProductSale,
};
