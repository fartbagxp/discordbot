const _ = require('lodash');
const debug = require('debug');

const config = require('./config');
const Broadcast = require('./broadcast');
const listener = require('./spoiler/reaction-listener');

const logger = debug('bot:filtered');

const filter = {};

filter.stop = () => {
  Broadcast.incomingEE.off(Broadcast.events.MessageEvent, handleMsg);
};

function setupFilter(msg, title, spoiler) {

  // setup a random emote for the message
  // Note: apparently not all of the guild emotes are available to you.
  // This needs to be stored in a configuration somewhere that we don't have access to all emotes.
  // const emote = msg.guild.emojis.random();
  const emote = config.emote;
  const emoteText = config.emoteText;

  msg.delete()
    .catch(console.error)
    .then(()=> {
      return msg.reply(`Spoiler created about **${title}**. React with ${emoteText} to see spoiler.`);
    })
    .catch(console.error)
    .then((msg) => {
      return Promise.all([msg, msg.react(emote)]);
    })
    .catch(console.error)
    .then((values) => {
      msg = values[0];
      listener.add(msg, emote, title, spoiler);
    })
    .catch(console.error);
}

/**
 * This handler will handle all incoming messages.
 * @param {Discord.Message} msg - A message in a channel to be filtered
 */
function handleMsg(msg) {
  const split = _.split(msg.content, ':');
  if(split.length > 2) {
    const spoiler = _.trim(split[1]);
    if(spoiler === 'spoiler') {
      const title = _.trim(split[0]);
      const spoiler = _.join(_.slice(split, 2), ':');
      logger(`Channel ${msg.channel.name} User = ${msg.author} Title = ${title}, Spoiler = ${spoiler}`);

      // setup the filter
      setupFilter(msg, title, spoiler);
    }
  }
}

function handleReaction(reaction, user) {
  listener.react(reaction, user);
}

Broadcast.incomingEE.on(Broadcast.events.IncomingMessageEvent, handleMsg);

Broadcast.incomingEE.on(Broadcast.events.IncomingReactionEvent, handleReaction);

module.exports = filter;
