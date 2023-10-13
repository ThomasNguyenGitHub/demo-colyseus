# Check out https://hub.docker.com/_/node to select a new base image
FROM node:18-slim

# Set to a non-root built-in user `node`
USER node

# Create app directory (with user `node`)
RUN mkdir -p /home/node/app

WORKDIR /home/node/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=node package*.json ./

RUN npm install

# Bundle app source code
COPY --chown=node . .

RUN npm run build

# Bind to all network interfaces so that it can be mapped to the host OS
#ENV HOST=0.0.0.0 PORT=8080

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=''
ENV PORT=2567
ENV REDIS_URL = ''
ENV COLYSEUS_SEAT_RESERVATION_TIME='50'
EXPOSE 2567

ENV PUBLISH_ADDR  = ''
ENV SELF_HOSTNAME  = ''
ENV SELF_PORT  = '443'
#EXPOSE ${PORT}
CMD [ "node", "." ]
