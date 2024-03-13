# Development Stage
FROM node:alpine as development

WORKDIR /usr/src/app

# Copy package.json and yarn.lock first to leverage Docker's build cache
COPY package.json yarn.lock pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm install -g pnpm

# Copy application code
COPY apps/reservations apps/reservations
COPY libs  libs

# Install dependencies
RUN pnpm install -r

# Build the application
RUN pnpm run build reservations

# Production Stage
FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
RUN npm install -g pnpm

WORKDIR /usr/src/app

# Copy package.json and yarn.lock first to leverage Docker's build cache
COPY package.json yarn.lock ./

# Install dependencies
RUN pnpm install --prod

# Copy built application code from the development stage
COPY --from=development /usr/src/app/dist ./dist

# Specify the command to run the application
CMD ["node", "dist/apps/reservations/main"]
