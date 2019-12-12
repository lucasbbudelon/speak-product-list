# Stage 1
FROM node:8.11.4-alpine as node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --prod
# Stage 2
FROM nginx:1.15.3-alpine
COPY --from=node /usr/src/app/dist/speak-product-list /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
