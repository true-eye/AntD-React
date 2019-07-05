FROM node:9.5.0

ENV NPM_CONFIG_LOGLEVEL info

RUN mkdir /app
WORKDIR /app

ADD package.json /app/
RUN npm install

ADD . /app

RUN npm run build --production
