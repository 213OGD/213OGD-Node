FROM node:15.5.0-alpine3.10

RUN mkdir /app
WORKDIR /app

COPY . .
RUN npm i
CMD npm run start:u