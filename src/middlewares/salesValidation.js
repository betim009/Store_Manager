const validateSale = (req, res, next) => {
  const { body } = req;

  // Verifica se todos os itens possuem o campo "productId"
  const productIdExists = body.every((item) => item.productId !== undefined);

  if (!productIdExists) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  // Verifica se todos os itens possuem o campo "quantity"
  const quantityExists = body.every((item) => item.quantity !== undefined);

  if (!quantityExists) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  // Verifica se todos os itens possuem a quantidade maior do que zero
  // const quantityGreaterThanZero = body.every((item) => item.quantity > 0);
  const quantityGreaterThanZero = body.every((item) => item.quantity >= 1);

  if (!quantityGreaterThanZero) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

module.exports = {
  validateSale,
};
