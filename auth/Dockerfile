FROM node:14.17.3-alpine
WORKDIR /app

COPY package*.json ./
COPY .npmrc .npmrc
RUN npm i
RUN rm -rf .npmrc
COPY . .

CMD npm run start