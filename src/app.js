const debug = require('debug');

const config = require('./config');
const discord = require('./discord/client');

const filter = require('./filter');

const logger = debug('bot:app');

logger('Discord bot has started.');

const app = {};

app.start = async () => {
  // connect to the database
  const status = await discord.login(config.token);
  logger(`Logged in to discord with status ${status}`);

  filter.listen();
};

module.exports = app;
