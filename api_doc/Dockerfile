FROM node:19.3

WORKDIR /usr/src/app

RUN npm install apidoc -g && npm install

ENTRYPOINT apidoc -c apidoc.json -e node_modules -e models -i ../api_code -o doc && npm start
