ARG node_version=node:lts
ARG nginx_version=nginx:1.21.3-alpine

FROM $node_version as image
WORKDIR /usr/customer-service
COPY ./package*.json ./


FROM image AS build
ARG env=DEV
RUN npm install --legacy-peer-deps
COPY . .

RUN npm run build

FROM $nginx_version
COPY ./nginx/http-nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build ./usr/customer-service/build /usr/share/nginx/html/customer-service
EXPOSE 3004
CMD ["nginx", "-g", "daemon off;"]

