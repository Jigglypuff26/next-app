FROM node:lts AS dependencies
WORKDIR /next-app
COPY package.json next-app/package.json
RUN npm install --frozen-lockfile

FROM node:lts AS builder
WORKDIR /next-app
COPY . .
COPY --from=dependencies /next-app/node_modules ./node_modules
RUN npm build

FROM node:lts AS runner
WORKDIR /next-app
ENV NODE_ENV production

COPY --from=builder /next-app/public ./public
COPY --from=builder /next-app/package.json ./package.json
COPY --from=builder /next-app/.next ./.next
COPY --from=builder /next-app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]