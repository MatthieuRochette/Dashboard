FROM node:lts-alpine AS build

RUN npm install -g http-server

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]