# Overview

[![Build Status](https://travis-ci.org/fartbagxp/discordbot.svg?branch=master)]

This is random project for a bot in a discord channel.

It currently tries to coverup spoilers by deleting the spoiler message, and sending people whispers if they react to the message.

## Setup

The bot is written in [NodeJS](https://nodejs.org/en/). It will work on version 6 and above.

### Getting Discord Credentials

Read the [discord developer page](https://discordapp.com/developers/docs/intro) and get yourself a bot credential.

### To add the bot to your channel

Once the bot account is created, give your bot certain permissions for your server.
To generate the proper link for the permission, you should use the [permission calculator](https://discordapi.com/permissions.html).

[Bot Permission Link](https://discordapp.com/oauth2/authorize?&client_id=<client_id>&scope=bot&permissions=37092416)

### How to run

Once you cloned this project, you can run it using the following commands.

Run `npm install`

Run `npm start`

## Usage

By default, the bot will listen to all the channels.

Every message is parsed, and if it is in the form of `<Title>:spoiler:<Spoiler>`, the bot will delete the message, and replace it with it's own message.

The parsing is fairly lenient as well, so you can do `<Title> : spoiler :<Spoiler>` as well.

For example, `Game of Thrones: spoiler : THE CHAIR CAN'T FIT EVERYBODY.` will trigger the bot to delete the message and create a reaction out of it.

## Helpful Links

[Discord.JS API](https://discord.js.org/#/docs/main/stable/general/welcome)
