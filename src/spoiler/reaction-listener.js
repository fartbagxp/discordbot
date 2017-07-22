const listener = {};

const storage = {};

listener.add = (msg, emote, title, spoiler) => {
  const value = {
    emote: emote,
    title: title,
    spoiler: spoiler
  };

  storage[msg.id] = value;
};

/**
 * React and whisper to the user if they reacted to the spoiler
 */
listener.react = (reaction, user) => {
  const data = storage[reaction.message.id];

  if(data && data.emote === reaction.emoji.id) {
    user.createDM()
      .then((channel) => {
        return channel.send(`Spoilers regarding **${data.title}**: ${data.spoiler}`);
      })
      .catch(() => {
        return reaction.message.channel.send(`Cannot send private messages to ${user.username}`);
      })
      .catch((err) => {
        console.error('Failed to send any messages: ', user.username, err);
      });
  }
};

module.exports = listener;
