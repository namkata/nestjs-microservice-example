# Use Node Alpine as the base image for development
FROM node:alpine as development

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm install -g pnpm

COPY apps/payments apps/payments
COPY libs libs

# Install dependencies
RUN pnpm install -r

RUN pnpm run build payments

# Create a production image
FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN pnpm install --only=production

COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/package.json ./package.json

CMD [ "node", "dist/apps/payments/main" ]