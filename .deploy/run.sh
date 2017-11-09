#!/bin/sh

# Clean up
/usr/local/bin/docker-compose -f discordbot/docker-compose.yml down
docker rm $(docker ps -qa --no-trunc --filter "status=exited")
docker rmi $(docker images | grep "none" | awk '/ / { print $3 }')

rm -rf discordbot

sudo yum update -y && sudo yum install -y docker
service docker restart
sudo curl -L https://github.com/docker/compose/releases/download/1.17.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
/usr/local/bin/docker-compose --version

# Update packages
tar xvzf discordbot.tar.gz
# cd discordbot && sudo npm install --production
/usr/local/bin/docker-compose -f discordbot/docker-compose.yml pull
/usr/local/bin/docker-compose -f discordbot/docker-compose.yml build
/usr/local/bin/docker-compose -f discordbot/docker-compose.yml up -d

docker ps -a
