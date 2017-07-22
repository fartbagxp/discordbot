const Discord = require('discord.js');
const Broadcast = require('./broadcast');

const chat = {};

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  console.log(`Logged in as ${client.user.tag}!`);
  client.channels.map((channel) => {
    console.log(`Joining: ${channel.guild.name} - ${channel.name}`);
  });
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

chat.start = (token) => {
  client.login(token);
};

chat.reply = (msg) => {
  client.reply(msg);
};

module.exports = chat;


