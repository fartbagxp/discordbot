const dotenv = require('dotenv');

dotenv.config();

const config = {
  // Discord bot token
  token: process.env.DISCORD_BOT_TOKEN || '',

  // Discord library message cache
  messageCacheMaxSize: 1000,

  // Redis
  redisHost: process.env.REDIS_HOST || 'localhost',
  redisPort: process.env.REDIS_PORT || 6379,

  // amazon affiliates link
  amazonTag: process.env.AMAZON_AFFILATES_TAG || '',

  // Application specifics
  emote: process.env.EMOTE || '',
  emoteText: process.env.EMOTE_TEXT || ''
};

module.exports = config;
