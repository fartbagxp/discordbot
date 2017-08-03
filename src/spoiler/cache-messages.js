const _ = require('lodash');
const debug = require('debug');
const client = require('../db/client');

const logger = debug('bot:cache');

function cacheMessages(channels, messages) {
  _.forEach(messages, (message) => {
    const channel = channels.get(message.channelId);
    if(channel) {
      return channel.fetchMessage(message.messageId);
    }
  });
}

/**
 * This function will start listening to all previous messages
 * for reactions.
 *
 * @param {Discord.Channels} channels
 */
function start(channels) {
  return client.getAllReactionMessages()
    .then((messages) => {
      return cacheMessages(channels, messages);
    })
    .catch((err) => {
      logger(`Unable to cache messages: error = ${err}`);
    });
}

module.exports = start;
