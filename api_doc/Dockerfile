FROM node:19.3

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./apidoc.json ./
COPY ./index.js ./

RUN npm install apidoc -g && npm install

CMD apidoc -i ../api_code -o ./doc -e node_modules -e package-lock.json && npm start
