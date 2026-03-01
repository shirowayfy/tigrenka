FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG PUBLIC_STRAPI_URL=http://localhost:1337
ENV PUBLIC_STRAPI_URL=${PUBLIC_STRAPI_URL}

ENV HOST=0.0.0.0
ENV PORT=4321

EXPOSE 4321

# NODE_ENV=production → build + node (prod)
# иначе → astro dev (dev)
CMD sh -c 'NODE_ENV_UPPER=$(echo "$NODE_ENV" | tr "a-z" "A-Z"); if [ "$NODE_ENV_UPPER" = "PRODUCTION" ]; then npm run build && node dist/server/entry.mjs; else npx astro dev --host 0.0.0.0; fi'
