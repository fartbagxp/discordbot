#!/usr/bin/env

IP=$1

tar -zcvf discordbot.tar.gz --exclude=../../discordbot/.git --exclude=../../discordbot/.docker --exclude=../../discordbot/node_modules --exclude=../../discordbot/coverage ../../discordbot

echo "Deploying to $IP"
scp discordbot.tar.gz ec2-user@$IP:~
ssh ec2-user@$IP 'sudo bash -s' < run.sh

rm -rf discordbot.tar.gz
