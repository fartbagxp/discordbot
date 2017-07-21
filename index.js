const dotenv = require('dotenv');
const chat = require('./src/chat');
require('./src/filter');

dotenv.config();

let config = {
  token: process.env.DISCORD_BOT_TOKEN,
};

chat.start(config.token);

