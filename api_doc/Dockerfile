FROM node:19.3

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./apidoc.json ./
COPY ./index.js ./

RUN npm install apidoc -g && npm install

CMD ["npm","start"]
