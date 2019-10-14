FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install node-gyp node-pre-gyp && npm install && npm rebuild bcrypt --build-from-source

COPY . .

CMD npm run watch