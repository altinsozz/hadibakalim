const Currency = require('../models/currency');

module.exports = {
  name: 'removecurrency',
  description: 'Removes a currency from the database.',
  usage: '<currency>',
  async execute(message, args) {
    const currencyName = args[0];

    try {
      // Check if currency exists in the database
      const currency = await Currency.findOne({ name: currencyName });
      if (!currency) {
        return message.reply('That currency does not exist in the database!');
      }

      // Remove currency from database
      await currency.remove();
      message.reply(`${currencyName} has been removed from the database.`);
    } catch (err) {
      console.error(err);
      message.reply('There was an error removing the currency from the database.');
    }
  },
};
