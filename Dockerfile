FROM node:18-alpine

RUN apk add --update --no-cache ffmpeg

WORKDIR /app

ADD . /app

RUN npm install --force

CMD ["npm", "run", "start"]

EXPOSE 2020
