FROM node:14.7.0-alpine

WORKDIR /app

COPY package.json ./
COPY .npmrc .npmrc
RUN npm i
RUN rm -rf .npmrc
COPY . ./

CMD npm run start