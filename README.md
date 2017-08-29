# Overview

![Build Status](https://travis-ci.org/fartbagxp/discordbot.svg?branch=master)

This is random project for a bot in a discord channel.

It currently tries to coverup spoilers by deleting the spoiler message, and sending people whispers if they react to the message.

## Prerequisite

The bot is written in [NodeJS](https://nodejs.org/en/). Install the latest version (version 8).

[Redis](https://redis.io) is also needed for data storage.

### Getting Discord Credentials

Read the [discord developer page](https://discordapp.com/developers/docs/intro) and get yourself a bot credential.

### To add the bot to your channel

Once the bot account is created, give your bot certain permissions for your server.
To generate the proper link for the permission, you should use the [permission calculator](https://discordapi.com/permissions.html).

[Bot Permission Link](https://discordapp.com/oauth2/authorize?&client_id=<client_id>&scope=bot&permissions=37092416)

### How to run

1. Download [Docker](https://www.docker.com/).

1. Run `sh .docker/docker-rebuild.sh`

1. Run `sh .docker/docker-start.sh`

Subsequent runs after code change can simply run `docker-start.sh` again.

## Usage

By default, the bot will listen to all the channels.

Every message is parsed, and if it is in the form of `<Title>:spoiler:<Spoiler>`, the bot will delete the message, and replace it with it's own message.

The parsing is fairly lenient as well, so you can do `<Title> : spoiler :<Spoiler>` as well.

For example, `Game of Thrones: spoiler : THE CHAIR CAN'T FIT EVERYBODY.` will trigger the bot to delete the message and create a reaction out of it.

## Helpful Links

[Discord.JS API](https://discord.js.org/#/docs/main/stable/general/welcome)
