# Etapa 1: build da aplicação
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY prisma ./prisma
COPY src ./src

# Gera Prisma Client
RUN npx prisma generate

# Etapa 2: imagem final
FROM node:20-alpine

WORKDIR /app

COPY --from=build /app /app

# Expõe a porta do seu servidor (altere conforme necessário)
EXPOSE 4000

CMD ["npm", "run", "dev"]
