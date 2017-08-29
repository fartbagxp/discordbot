const dotenv = require('dotenv');

dotenv.config();

const config = {

  // Discord bot token
  token: process.env.DISCORD_BOT_TOKEN,

  // Discord library message cache
  messageCacheMaxSize: 1000,

  // Redis
  redisHost: process.env.REDIS_HOST,

  redisPort: process.env.REDIS_PORT
};

module.exports = config;
