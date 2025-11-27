FROM node:22-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY .next/standalone ./.next/standalone
COPY .next/static ./.next/standalone/.next/static
COPY public ./.next/standalone/public

EXPOSE 3000

CMD ["node", ".next/standalone/server.js"]