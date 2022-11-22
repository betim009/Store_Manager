const express = require('express');

const router = express.Router();

const { salesController } = require('../controllers');

router.get('/', salesController.listSales);

router.get('/:id', salesController.getSales);

module.exports = router;
