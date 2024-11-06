FROM node:20-alpine

WORKDIR /planerp/spa
COPY package.json .

EXPOSE 7070
RUN apk add yarn 
RUN yarn install

