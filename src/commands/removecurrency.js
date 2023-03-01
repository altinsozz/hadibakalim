const { MessageEmbed } = require("discord.js");
const CurrencyShop = require("../models/currencyshop");

module.exports = {
  name: "removecurrency",
  description: "Removes a currency",
  async execute(message, args) {
    if (!args.length) {
      return message.channel.send(
        "Lütfen kaldırmak istediğiniz para biriminin adını girin. Örneğin: !removecurrency Bitcoin"
      );
    }
    const name = args[0];

    try {
      const currency = await CurrencyShop.findOneAndDelete({ name: name });
      return message.channel.send(
        `Başarıyla bir para birimi silindi: ${currency.name}`
      );
    } catch (err) {
      console.log(err);
      return message.channel.send(
        "Bir hata oluştu, para birimi silinemedi. Lütfen tekrar deneyin."
      );
    }
  },
};
