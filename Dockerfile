# ========= builder =========
FROM node:22-alpine AS builder
WORKDIR /app

# (optional) use pnpm; comment these two lines if you prefer npm
RUN corepack enable && corepack prepare pnpm@9.11.0 --activate

COPY package.json package-lock.json* ./
RUN npm ci
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# ========= runtime =========
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# (optional) use pnpm in runtime for prune; fallback to npm
RUN corepack enable || true

COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml* /app/package-lock.json* ./

RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
EXPOSE 3000

# Start with path alias + env + decorators
CMD ["node", "-r", "tsconfig-paths/register", "-r", "dotenv/config", "-r", "reflect-metadata", "dist/main/server.js"]
