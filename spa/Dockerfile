# Use uma imagem Node.js mais recente
FROM node:20

# Defina o diretório de trabalho no container
WORKDIR /app

# Copie os arquivos package.json e package-lock.json (se disponível)
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie os arquivos do projeto para o diretório de trabalho
COPY . .

# Exponha a porta que o Vite usa por padrão
EXPOSE 5173

# Comando para rodar a aplicação em modo de desenvolvimento
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]