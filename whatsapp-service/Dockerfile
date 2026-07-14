FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src/ src/
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

RUN apk add --no-cache tini

COPY --from=builder /app/dist dist/
COPY --from=builder /app/node_modules node_modules/
COPY package.json ./

ENV NODE_ENV=production
ENV WHATSAPP_SERVICE_PORT=3001

EXPOSE 3001

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "dist/index.js"]
