FROM node:18-alpine

ENV NODE_ENV=production

# Set working directory
WORKDIR /app

# Copy package.json and lock file first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . ./

# Expose the dev server port
EXPOSE 5173

# Run the dev server
CMD ["npm", "start"]
