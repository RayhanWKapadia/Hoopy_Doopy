FROM node:22.12

# Set working directory
WORKDIR /app

# Copy package.json and lock file first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose the dev server port
EXPOSE 3000

# Run the dev server
CMD ["npx", "tsx", "index.ts"]
