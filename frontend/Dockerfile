FROM node:20.11-alpine
WORKDIR /app
COPY package.json .
RUN npm i
RUN npm run build
COPY ./dist .
RUN npm i -g serve
CMD [ "serve", "./dist" ]