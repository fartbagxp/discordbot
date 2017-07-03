const SpoilerBot = require('discord-spoiler-bot');
const dotenv = require('dotenv');

dotenv.config();

let config = {
  token: process.env.DISCORD_BOT_TOKEN,
};

process.on('unhandledRejection', console.error);

let bot = new SpoilerBot(config);
bot.connect();
