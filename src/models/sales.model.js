const connection = require('./database/connection');

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

const findById = async (id) => {
  const [result] = await connection.execute(
    `SELECT
      sale.date, saleProduct.product_id AS productId, saleProduct.quantity
    FROM
      sales sale
      INNER JOIN StoreManager.sales_products saleProduct ON sale.id = saleProduct.sale_id
      WHERE sale.id = ${id}
    ORDER BY sale.id, saleProduct.product_id`,
  );
  return result;
};

module.exports = {
  findAll,
  findById,
};
