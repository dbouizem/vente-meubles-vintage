FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
COPY front/package.json ./front/package.json
COPY back/package.json ./back/package.json
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY package.json package-lock.json ./
COPY front/package.json ./front/package.json
COPY back/package.json ./back/package.json
RUN npm ci --omit=dev && npm cache clean --force
COPY back ./back
COPY --from=build /app/front/dist ./front/dist
EXPOSE 3000
CMD ["node", "back/serveur.js"]
