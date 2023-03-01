const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema({
  userID: { type: String, require: true, unique: true },
  coins: { type: Number, default: 0 },
  coinBoost: { type: Number, default: 0 },
  coinBoostExpiry: { type: Date, default: Date.now },
  cielCoin: { type: Number, default: 0 },
  cielCoinBoost: { type: Number, default: 0 },
  cielCoinBoostExpiry: { type: Date, default: Date.now },
  shulCoin: { type: Number, default: 0 },
  shulCoinBoost: { type: Number, default: 0 },
  shulCoinBoostExpiry: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
});

currencySchema.methods.updateCoinBoost = async function () {
  // Check if coin boost has expired, if so set it back to 0
  if (Date.now() >= this.coinBoostExpiry) {
    this.coinBoost = 0;
    this.coinBoostExpiry = Date.now();
  }

  // Check if ciel coin boost has expired, if so set it back to 0
  if (Date.now() >= this.cielCoinBoostExpiry) {
    this.cielCoinBoost = 0;
    this.cielCoinBoostExpiry = Date.now();
  }

  // Check if shul coin boost has expired, if so set it back to 0
  if (Date.now() >= this.shulCoinBoostExpiry) {
    this.shulCoinBoost = 0;
    this.shulCoinBoostExpiry = Date.now();
  }

  // Update lastUpdated field
  this.lastUpdated = Date.now();

  // Save changes to database
  await this.save();
};

currencySchema.methods.updateCoins = async function (amount, currency) {
  // Check if currency is valid
  if (!['coin', 'cielCoin', 'shulCoin'].includes(currency)) {
    throw new Error('Invalid currency type.');
  }

  // Update currency amount
  this[currency] += amount;

  // Update lastUpdated field
  this.lastUpdated = Date.now();

  // Save changes to database
  await this.save();
};

currencySchema.methods.getCoins = function (currency) {
  // Check if currency is valid
  if (!['coin', 'cielCoin', 'shulCoin'].includes(currency)) {
    throw new Error('Invalid currency type.');
  }

  // Return currency amount
  return this[currency];
};

module.exports = mongoose.model('Currency', currencySchema);
