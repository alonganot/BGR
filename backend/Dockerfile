FROM node:20.11-alpine AS build
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
RUN npm run build

FROM node:20.11-alpine AS prod
COPY --from=build /app/package.json .
RUN npm install --only=production
COPY --from=build /app/dist ./dist
EXPOSE 3000
ENTRYPOINT ["npm", "run", "start:prod"]
