const connection = require('./database/connection');

// Busca todas as vendas
const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT
      sale.id AS saleId, sale.date,
      saleProduct.product_id AS productId, saleProduct.quantity
    FROM
      sales sale
      INNER JOIN sales_products saleProduct ON sale.id = saleProduct.sale_id
    ORDER BY sale.id, saleProduct.product_id`,
  );
  return result;
};

// Busca uma venda específica pelo ID
const findById = async (id) => {
  const [result] = await connection.execute(
    `SELECT
      sale.date, saleProduct.product_id AS productId, saleProduct.quantity
    FROM
      sales sale
      INNER JOIN sales_products saleProduct ON sale.id = saleProduct.sale_id
      WHERE sale.id = ${id}
    ORDER BY sale.id, saleProduct.product_id`,
  );
  return result;
};

// Insere uma nova venda.
// Recebe um objeto contendo a lista de produtos (productId e quantity) que devem ser associados à sale.
// Retorna o ID da sale recém-criada.
const insertSaleWithProducts = async ({ products }) => {
  const date = new Date();
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (?)',
    [date],
  );

  products.forEach(async (product) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [insertId, product.productId, product.quantity],
    );
  });

  return insertId;
};

module.exports = {
  findAll,
  findById,
  insertSaleWithProducts,
};
