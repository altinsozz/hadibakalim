// Coin modelini alın
const Coin = require('./models/coin');

// Para birimlerini oluşturun
const coins = [
  { name: 'Loia Coin', value: 0.01 },
  { name: 'Ciel Coin', value: 0.01 },
  { name: 'Shulkoin', value: 0.01 }
];

// Para birimlerini veritabanına kaydedin
Coin.insertMany(coins)
  .then(() => {
    console.log('Para birimleri başarıyla eklendi.');
  })
  .catch((err) => {
    console.log('Bir hata oluştu:', err);
  });
