const Currency = require('../models/currency');

module.exports = {
  name: 'addcurrency',
  description: 'Adds a new currency to the database.',
  usage: '<currency>',
  async execute(message, args) {
    const currencyName = args[0];

    try {
      // Check if currency already exists in the database
      const currency = await Currency.findOne({ name: currencyName });
      if (currency) {
        return message.reply('That currency already exists in the database!');
      }

      // Create new currency and save to database
      const newCurrency = new Currency({ name: currencyName, value: 0.01 });
      await newCurrency.save();
      message.reply(`${currencyName} has been added to the database.`);
    } catch (err) {
      console.error(err);
      message.reply('There was an error adding the currency to the database.');
    }
  },
};
