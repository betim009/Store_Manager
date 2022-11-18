const express = require('express');

const { productsController } = require('../controllers');

const validateProducts = require('../middlewares/validateProducts');

const router = express.Router();

router.get('/', productsController.listProducts);
router.get('/:id', productsController.getProducts);
router.post('/', validateProducts, productsController.createProduct);

module.exports = router;
