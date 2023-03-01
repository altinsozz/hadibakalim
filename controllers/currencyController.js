const CurrencyShop = require('../models/currency');

function randomizePrice(rate, supply) {
    const volatility = 0.1; // Price change up to 10% each minute
    const delta = Math.random() * rate * volatility;
    const direction = Math.random() > 0.5 ? 1 : -1;