FROM node:20-alpine

WORKDIR /home/app

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=password
COPY app/package*.json ./

RUN npm install

COPY app/ .
CMD ["node", "/home/app/server.js"]