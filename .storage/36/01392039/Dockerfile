# Use Node.js as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Copy server files
COPY . .

# Create necessary directories
RUN mkdir -p logs backups

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose the port
EXPOSE 5000

# Set permissions for deployment script
RUN chmod +x ./deploy.sh

# Start the server
CMD ["node", "server.js"]