const Discord= require('discord.js')
const { Client, Intents } = require('discord.js');
const mongoose = require('mongoose');
const CurrencyShop = require('./models/currency');
const { prefix, token } = require('./config.json');

const currenciesRouter = require('./routes/currencies');
app.use('/currencies', currenciesRouter);


const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.commands = new Discord.Collection();

// Command handler setup
const fs = require('fs');
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./src/commands/${file}`);
    client.commands.set(command.name, command);
}

// Mongoose setup
mongoose.connect('mongodb://localhost/discordBot', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB!');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

// Bot ready event
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Message listener
client.on('messageCreate', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    // Check if command is guild only
    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    // Check if command requires arguments
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    // Check if user is in currency database, if not, add them
    try {
        let userCurrency = await CurrencyShop.findOne({ userID: message.author.id });
        if (!userCurrency) {
            userCurrency = new CurrencyShop({ userID: message.author.id, coins: 0, bank: 0, items: {} });
            await userCurrency.save();
        }
    } catch (err) {
        console.error(err);
        message.reply('Sorry, an error occurred.');
    }

    // Execute command
    try {
        command.execute(message, args);
    } catch (err) {
        console.error(err);
        message.reply('Sorry, an error occurred.');
    }
});

// Login to Discord with bot token
client.login(token);
