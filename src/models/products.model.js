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

const update = async (id, name) => {
  const result = connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [name, id],
  );
  return result;
};

const deleteById = async (id) => {
  const result = connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return result;
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
  deleteById,
};
