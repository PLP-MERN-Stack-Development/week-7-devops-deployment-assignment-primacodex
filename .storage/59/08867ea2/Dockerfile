# Use Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy server files
COPY . .

# Expose the API port
EXPOSE 5000

# Command to run the server
CMD ["node", "server.js"]