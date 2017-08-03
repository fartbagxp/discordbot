const client = require('../db/client');
const debug = require('debug');

const logger = debug('bot:reaction');

const listener = {};

/**
 * Add the message to the database so we can retrieve it later.
 */
listener.add = (msg, emote, title, spoiler) => {
  return client.addReactionMessage(msg.channel.id, msg.id, emote, title, spoiler);
};

/**
 * React and whisper to the user if they reacted to the spoiler.
 */
listener.react = (reaction, user) => {
  client.getReactionMessage(reaction.message.channel.id, reaction.message.id)
    .then((message) => {
      logger(`Message found in reaction: ${JSON.stringify(message, null, 2)}`);
      return reply(message, reaction, user);
    })
    .catch((err) => {
      logger(`Error attempting to reply with reaction: ${err}`);
    });
};

/**
 * This function will reply the spoiler to the user upon checking whether
 * we are holding the message.
 *
 * @param {Object} stored - The database stored item for matched data
 * @param {MessageReaction} reaction - The message reaction class from Discord.JS
 * @param {User} user - The user class from Discord.JS
 */
function reply(stored, reaction, user) {
  if(!stored) {
    return;
  }

  if(stored.emote !== reaction.emoji.id) {
    return;
  }

  // send the user a private message if DM channels are available
  return user.createDM()
    .then((channel) => {
      return channel.send(`Spoilers regarding **${stored.title}**: ${stored.spoiler}`);
    })
    .catch(() => {
      return reaction.message.channel.send(`Cannot send private messages to ${user.username}`);
    });
}


module.exports = listener;
