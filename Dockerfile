FROM node:12-alpine
LABEL version="0.1"

WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm i --only=prod
EXPOSE 3000
CMD [ "node", "server.js" ]
HEALTHCHECK --interval=15s --timeout=3s \
  CMD curl -f http://localhost:3000/ || exit 1