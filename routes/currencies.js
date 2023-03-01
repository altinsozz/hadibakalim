const express = require('express');
const router = express.Router();
const currencyController = require('../controllers/currencyController');

router.get('/', currencyController.getAllCurrencies);
router.post('/', currencyController.addNewCurrency);
router.delete('/:id', currencyController.deleteCurrency);

module.exports = router;
