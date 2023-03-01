const mongoose = require('mongoose');
const { Schema } = mongoose;

const currencyShopSchema = new Schema({
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  value: { type: Number, required: true },
});

module.exports = mongoose.model('CurrencyShop', currencyShopSchema);
