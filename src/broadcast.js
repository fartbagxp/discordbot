const EventEmitter = require('events');

const broadcast = {};

// An event emitter for all incoming messages to the bot
broadcast.incomingEE = new EventEmitter();

// An event emitter for all outgoing messages from the bot
broadcast.outgoingEE = new EventEmitter();

broadcast.events = {

  // IncomingMessageEvent signifies all incoming messages to the bot
  IncomingMessageEvent: 'IncomingMessageEvent',

  // OutgoingMessageEvent signifies all outgoing messages from the bot
  OutgoingMessageEvent: 'OutgoingMessageEvent',

  // OutgoingEditMessageEvent signifies all outgoing messages from the bot used to edit people's messages
  OutgoingEditMessageEvent: 'OutgoingEditMessageEvent'
};

module.exports = broadcast;
