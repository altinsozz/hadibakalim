const { MessageEmbed } = require("discord.js");
const CurrencyShop = require("../models/currencyshop");

module.exports = {
  name: "addcurrency",
  description: "Adds a new currency",
  async execute(message, args) {
    if (!args.length) {
      return message.channel.send(
        "Lütfen para birimi adını ve değerini girin. Örneğin: !addcurrency Bitcoin 1000"
      );
    }
    const name = args[0];
    const value = args[1];

    try {
      const currency = await CurrencyShop.create({
        name: name,
        value: value,
      });
      return message.channel.send(
        `Başarıyla yeni bir para birimi eklendi: ${currency.name} (${currency.value} XDC)`
      );
    } catch (err) {
      console.log(err);
      return message.channel.send(
        "Bir hata oluştu, para birimi eklenemedi. Lütfen tekrar deneyin."
      );
    }
  },
};
