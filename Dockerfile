FROM node:12-alpine AS dependencies
WORKDIR /src
COPY [ "package.json", "yarn.lock", "./" ]
RUN yarn

FROM node:12-alpine AS build
WORKDIR /src
COPY --from=dependencies /src/node_modules ./node_modules
COPY client ./client
COPY config ./config
COPY [ ".eslintignore", ".eslintrc.js", "index.js", "package.json", "webpack.config.js", "./" ]
RUN yarn build.dev

FROM node:12-alpine
WORKDIR /src
COPY --from=build /src/dist ./dist
COPY --from=dependencies /src/node_modules ./node_modules
COPY config ./config
COPY [ "index.js", "package.json", "./" ]
EXPOSE 3000
ENTRYPOINT node index.js
