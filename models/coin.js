const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  value: { type: Number, required: true, default: 0.01 },
});

coinSchema.methods.randomizeValue = function() {
  const change = Math.random() * 0.1 - 0.05; // randomly change value by +/- 5%
  this.value += this.value * change;
  if (this.value < 0.01) {
    this.value = 0.01;
  }
};

const Coin = mongoose.model('Coin', coinSchema);

module.exports = Coin;
