const _ = require('lodash');
const debug = require('debug');

const config = require('./config');
const Broadcast = require('./message-broadcast');
const listener = require('./commands/spoiler/reaction-listener');

const logger = debug('bot:filtered');

const filter = {};

filter.stop = () => {
  Broadcast.incomingEE.off(Broadcast.events.MessageEvent, handleMsg);
};

function help(msg) {
  return msg
    .reply(
      'You can generate a spoiler using the following command: `<title>:spoiler:<spoiler-text>`'
    )
    .catch(console.error);
}

function setupFilter(msg, title, spoiler) {
  // setup a random emote for the message
  // Note: apparently not all of the guild emotes are available to you.
  // This needs to be stored in a configuration somewhere that we don't have access to all emotes.
  // const emote = msg.guild.emojis.random();
  const emote = config.emote;
  const emoteText = config.emoteText;

  msg
    .delete()
    .catch(console.error)
    .then(() =>
      msg.reply(
        `Spoiler created about **${title}**. React with ${emoteText} to see spoiler.`
      )
    )
    .catch(console.error)
    .then(emoteMsg => Promise.all([emoteMsg, emoteMsg.react(emote)]))
    .catch(console.error)
    .then(values => {
      const dbMsg = values[0];
      listener.add(dbMsg, emote, title, spoiler);
    })
    .catch(console.error);
}

/**
 * This handler will handle all incoming messages.
 *
 * @param {Discord.Message} msg - A message in a channel to be filtered
 */
async function handleMsg(msg) {
  if (msg.content === '!help') {
    return help(msg).catch(console.error);
  }

  const book = '/home/doker/scripts/book/Chapter-0.mp3';

  if (msg.content === '!join') {
    // Only try to join the sender's voice channel if they are in one themselves
    if (msg.member.voiceChannel) {
      const connection = await msg.member.voiceChannel.join();

      const dispatcher = connection.playFile(book, {
        volume: 0.8,
        passes: 3
      });

      dispatcher.on('finish', () => {
        console.log('Finished playing!');
        dispatcher.destroy();
      });
    } else {
      // msg.reply('You need to join a voice channel first!');
    }
  }

  // const split = _.split(msg.content, ':');
  // if (split.length > 2) {
  //   const spoiler = _.trim(split[1]);
  //   if (spoiler === 'spoiler') {
  //     const title = _.trim(split[0]);
  //     const spoiler = _.join(_.slice(split, 2), ':');
  //     logger(
  //       `Channel ${msg.channel.name} User = ${
  //         msg.author
  //       } Title = ${title}, Spoiler = ${spoiler}`
  //     );

  //     // setup the filter
  //     // setupFilter(msg, title, spoiler);
  //   }
  // }
}

function handleReaction(reaction, user) {
  listener.react(reaction, user);
}

filter.listen = () => {
  Broadcast.incomingEE.on(Broadcast.events.IncomingMessageEvent, handleMsg);

  Broadcast.incomingEE.on(
    Broadcast.events.IncomingReactionEvent,
    handleReaction
  );
};

filter.unlisten = () => {
  Broadcast.incomingEE.removeAllListeners(
    Broadcast.events.IncomingMessageEvent
  );

  Broadcast.incomingEE.removeAllListeners(
    Broadcast.events.IncomingReactionEvent
  );
};

module.exports = filter;
