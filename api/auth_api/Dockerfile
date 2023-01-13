FROM node:19.3

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./.env ./
COPY ./src ./

RUN npm install

CMD ["npm","start"]
