// const camelize = require('camelize');
// const snakeize = require('snakeize');
const connection = require('./database/connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products',
  );
  return (result);
};

const findById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  return (product);
};

const insert = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUE (?)',
    [name],
  );

  return insertId;
};

module.exports = {
  findAll,
  findById,
  insert,
};
