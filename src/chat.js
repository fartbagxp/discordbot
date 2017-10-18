const Discord = require('discord.js');
const CacheMessages = require('./spoiler/cache-messages');
const Broadcast = require('./broadcast');
const config = require('./config');
const debug = require('debug');
require('./filter');

const logger = debug('bot:chat');

const client = new Discord.Client();

client.on('ready', () => {
  logger(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  logger(`Logged in as ${client.user.tag}!`);
  client.channels.map((channel) => {
    if(channel.guild) {
      logger(`Joining: ${channel.guild.name} - ${channel.name}`);
    }
  });

  // cache a list of messages found in the database
  CacheMessages(client.channels);
});

client.on('message', msg => {
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(msg.author.bot) {
    return;
  }
  Broadcast.incomingEE.emit(Broadcast.events.IncomingMessageEvent, msg);
});

client.on('messageReactionAdd', (reaction, user) => {
  if(user.bot) {
    return;
  }
  Broadcast.incomingEE.emit(Broadcast.events.IncomingReactionEvent, reaction, user);
});

client.on('disconnect', (err) => {
  if(err.code === 1000) {
    client.destroy()
      .then(() => {
        client.login(config.token);
      })
      .catch((err) => {
        logger(`Unable to reconnect from a disconnection. Error is ${err}`);
      });
  }
});

client.on('reconnecting', () => {
  logger('Bot is reconnecting');
});

client.on('error', (err) => {
  logger(`Bot caught an error: ${err}`);
});

const chat = {};

chat.start = () => {
  client.login(config.token);
};

chat.reply = (msg) => {
  client.reply(msg);
};

module.exports = chat;


