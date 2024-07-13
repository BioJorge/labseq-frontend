Labseq Application

Esta aplicação consiste em uma API backend que calcula valores da sequência Labseq e um frontend React para interagir com a API.
A sequência Labseq é definida como:
l(n) = l(n-4) + l(n-3) para n > 3,
com casos base l(0) = 0, l(1) = 1, l(2) = 0, l(3) = 1.

## Pré-requisitos

- Docker e Docker Compose
  ou
- Terminal com Node.js e Java instalados

## Executando a aplicação

1. Clone o repositório:
   git clone https://github.com/BioJorge/labseq-frontend.git
   cd labseq-frontend

2. Construa e execute os containers usando Docker Compose:
   docker-compose up --build

3. Acesse a aplicação:

- Frontend: `http://localhost:5173`
- API Backend: `http://localhost:8080`
- Documentação Swagger: `http://localhost:8080/swagger-ui.html`

Para parar a aplicação, use `Ctrl+C` no terminal ou execute:
docker-compose down

## Estrutura do projeto

- `/api`: Contém o código-fonte do backend Spring Boot
- `/spa`: Contém o código-fonte do frontend React

## Documentação da API

A documentação completa da API está disponível através da interface Swagger UI. Acesse `http://localhost:8080/swagger-ui.html` em seu navegador após iniciar a aplicação.

## Desenvolvimento

Para desenvolvimento local sem Docker:

1. Backend (Spring Boot):
   cd api
   ./gradlew bootRun

2. Frontend (React):
   cd spa
   npm install
   npm run dev

## Exemplos de uso

Calcular o 10º valor da sequência Labseq:
GET http://localhost:8080/labseq/10

## Resolução de Problemas

Se encontrar problemas ao executar os containers, tente:

1. Limpar o cache do Docker: `docker system prune -a`
2. Reconstruir os containers: `docker-compose build --no-cache`
