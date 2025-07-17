FROM node:22

# Cria um diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas o package.json (e package-lock.json, se houver)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do projeto
COPY . .

# Expõe a porta que o app vai usar
EXPOSE 4000

# Comando para rodar o app
CMD ["node", "src/serven"]