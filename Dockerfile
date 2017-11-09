FROM mhart/alpine-node:8

# Create directories
RUN mkdir -p /app
WORKDIR /app

COPY . /app

# If you have native dependencies, you'll need extra tools
RUN apk add --no-cache make gcc g++ python

# cache nodejs
COPY package.json .
RUN cd /app && npm install --production
COPY . .

EXPOSE 8080
CMD ["node", "index.js"]
