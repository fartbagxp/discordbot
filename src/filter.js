const _ = require('lodash');
const Broadcast = require('./broadcast');

const filter = {};

filter.stop = () => {
  Broadcast.incomingEE.off(Broadcast.events.MessageEvent, handleMsg);
};

function setupFilter(msg) {
  // delete the message, using the message id
  // write a new message with a spoiler tag
  // setup a reaction listener
}

function handleMsg(msg) {
  console.info('Caught a message in filter: ', msg.content);

  const split = _.split(msg.content, ':');
  if(split.length > 2) {
    const spoiler = _.trim(split[1]);
    if(spoiler === 'spoiler') {
      const title = _.trim(split[0]);
      const spoiler = _.join(_.slice(split, 2), '');
      console.info(`Channel ${msg.channel.name} User = ${msg.author} Title = ${title}, Spoiler = ${spoiler}`);

      // setup the filter
      setupFilter(msg);

    }
  }
}

Broadcast.incomingEE.on(Broadcast.events.IncomingMessageEvent, handleMsg);

module.exports = filter;
