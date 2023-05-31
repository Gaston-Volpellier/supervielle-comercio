FROM node:19-alpine3.16 as build
WORKDIR /app
COPY .  /app
RUN npm install
CMD [ "npm", "run","dev" ]
EXPOSE 4000
