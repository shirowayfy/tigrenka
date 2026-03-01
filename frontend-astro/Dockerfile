FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG PUBLIC_STRAPI_URL=http://localhost:1337
ENV PUBLIC_STRAPI_URL=${PUBLIC_STRAPI_URL}

RUN npm run build

ENV HOST=0.0.0.0
ENV PORT=4321

EXPOSE 4321

CMD ["node", "dist/server/entry.mjs"]
