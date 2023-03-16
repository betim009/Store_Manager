const express = require('express');

const { productsController } = require('../controllers');

const validateProducts = require('../middlewares/validateProducts');

const router = express.Router();

// Rota para listar todos os produtos
router.get('/', productsController.listProducts);

// Rota para obter um produto específico pelo seu ID
router.get('/:id', productsController.getProducts);

// Rota para criar um novo produto
router.post('/', validateProducts, productsController.createProduct);

// Rota para atualizar um produto existente pelo seu ID
router.put('/:id', validateProducts, productsController.updateProduct);

// Rota para excluir um produto pelo seu ID
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
