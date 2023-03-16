const express = require('express');

const router = express.Router();

const { salesController } = require('../controllers');
const { validateSale } = require('../middlewares/salesValidation');

router.get('/', salesController.listSales);

router.get('/:id', salesController.getSales);

// O middleware de validação é executado antes do controlador
router.post('/', validateSale, salesController.insertProductSale);

module.exports = router;
