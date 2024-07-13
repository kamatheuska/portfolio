ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-alpine

ARG PORT
ENV NODE_ENV=production
ENV PORT=${PORT}

WORKDIR /usr/src/app

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

USER node

COPY . .

EXPOSE ${PORT}

CMD ["node", "src/server.js"]
