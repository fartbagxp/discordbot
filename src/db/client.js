const _ = require('lodash');
const Promise = require('bluebird');
const debug = require('debug');
const redis = require('redis');

const config = require('../config');

const logger = debug('bot:redis');

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

const c = {};

// simply connect once upon included
connect();

// Use this as the reaction key for all reaction messages
c.reactionKey = 'reaction';

function connect() {
  if (!c.client) {
    c.client = redis.createClient({
      host: config.redisHost,
      port: config.redisPort
    });

    c.client.on('ready', () => {
      logger('Connection to redis is redis.');
    });

    c.client.on('connect', () => {
      logger('Connected to redis.');
    });

    c.client.on('reconnecting', () => {
      logger('Reconnecting to redis.');
    });

    c.client.on('end', () => {
      logger('Connection to redis is closed.');
    });

    c.client.on('error', err => {
      logger(`Redis error caught: ${err}`);
    });
  }
}

/**
 * Add a reaction message to the database.
 */
c.addReactionMessage = (channelId, messageId, emoteId, title, spoiler) => {
  if (!c.client) {
    connect();
  }
  const key = `${c.reactionKey}:${channelId}:${messageId}`;
  const value = [
    'channel',
    channelId,
    'emote',
    emoteId,
    'title',
    title,
    'spoiler',
    spoiler
  ];
  return c.client.hmsetAsync(key, value);
};

/**
 * Get a reaction message from the database.
 */
c.getReactionMessage = (channelId, messageId) => {
  if (!c.client) {
    connect();
  }
  const key = `${c.reactionKey}:${channelId}:${messageId}`;
  return c.client.hgetallAsync(key);
};

/**
 * Get a list of reaction messages from each of the channels that we should be listening to
 */
c.getAllReactionMessages = () => {
  if (!c.client) {
    connect();
  }
  const key = `${c.reactionKey}:*`;
  return c.client.keysAsync(key).then(messages => transformKeys(messages));
};

function transformKeys(messages) {
  const transformed = [];
  _.forEach(messages, message => {
    const split = message.split(':');
    if (split.length >= 3) {
      transformed.push({
        channelId: split[1],
        messageId: split[2]
      });
    }
  });

  return transformed;
}

module.exports = c;
