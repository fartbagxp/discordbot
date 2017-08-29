# # Delete all containers
docker rm $(docker ps -a -q) --force
# Delete all images
docker rmi $(docker images -q) --force

# #Remove images not in compose file
docker rmi $(docker images -f "dangling=true" -q)

docker-compose pull
docker-compose build
