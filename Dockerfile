FROM node:23-alpine

WORKDIR /app

COPY package.json ./package.json
COPY package-lock.json ./package-lock.json

RUN npm install 

COPY . . 

EXPOSE 3000

CMD sh -c "npx prisma generate && npx prisma migrate dev --name init --skip-seed && npm run dev"