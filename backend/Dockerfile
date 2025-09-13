FROM node:22.12

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

# Use ts-node in ESM mode
CMD ["node", "--loader", "ts-node/esm", "index.ts"]
