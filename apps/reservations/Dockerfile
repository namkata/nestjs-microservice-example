# Development Stage
FROM node:alpine as development

WORKDIR /usr/src/app

# Copy package.json and yarn.lock first to leverage Docker's build cache
COPY package.json yarn.lock ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Production Stage
FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Copy package.json and yarn.lock first to leverage Docker's build cache
COPY package.json yarn.lock ./

# Install dependencies
RUN npm install --prod

# Copy built application code from the development stage
COPY --from=development /usr/src/app/dist ./dist

# Specify the command to run the application
CMD ["node", "dist/apps/reservations/main"]
