FROM node:20.11-alpine AS build
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
RUN npm run build

FROM nginx:latest as prod
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]