<<<<<<< HEAD
FROM node:14.7.0-alpine
=======
FROM node:14.17.3-alpine
>>>>>>> 7c72972a2167eaa25bd49b34f190313a948b8d74

WORKDIR /app

COPY package*.json ./
RUN npm i
COPY . .

CMD npm run start