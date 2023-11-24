FROM node:18-alpine

RUN apk add --update --no-cache ffmpeg python3 make g++
RUN npm install -g node-pre-gyp
RUN npm install -g pm2
RUN ln -sf /usr/bin/python3 /usr/bin/python

WORKDIR /app

ADD . /app

RUN npm install --force

CMD ["npm", "run", "start"]

EXPOSE 2020
