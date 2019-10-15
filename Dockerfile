FROM node:12

WORKDIR /app

COPY package.json ./package.json

RUN npm install -g node-gyp node-pre-gyp && npm install \
  && npm rebuild bcrypt --build-from-source

COPY . .

CMD ["npm", "watch"]
