# Stage 1: Install dependencies
FROM node:18-alpine AS deps

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Stage 2: Build the app
FROM node:18-alpine AS builder

WORKDIR /app

# Copy deps and source code
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the NestJS app
RUN npm run build

# Stage 3: Run the app
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy built output and dependencies
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Expose the port your NestJS app listens on (default 3000)
EXPOSE 3000

# Run the app
CMD ["node", "dist/main"]
