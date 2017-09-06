#!/bin/bash

# stop containers
docker stop $(docker ps -a -q)
docker-compose down
