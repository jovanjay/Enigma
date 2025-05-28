# Install dependencies only when needed
FROM node:18-alpine AS deps

# Set working directory
WORKDIR /app

# Copy only package files to install deps
COPY package.json package-lock.json* yarn.lock* ./

# Install dependencies
RUN \
  if [ -f yarn.lock ]; then yarn install; \
  elif [ -f package-lock.json ]; then npm install; \
  else echo "No lockfile found."; fi


# Rebuild the source code only when needed
FROM node:18-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the app
RUN yarn build || npm run build

# Production image
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

ENV NODE_ENV=production

# Copy only necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Port used by Next.js
EXPOSE 3000

# Start the app
CMD ["node_modules/.bin/next", "start"]
