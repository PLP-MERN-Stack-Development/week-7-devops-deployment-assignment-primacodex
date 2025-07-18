#!/bin/bash

# MERN Stack Deployment Script
# This script automates the deployment process for the MERN stack application

# Exit on any error
set -e

echo "Starting deployment process..."
echo "==============================="

# Check for environment
if [ -z "$NODE_ENV" ]; then
  echo "NODE_ENV not set. Defaulting to production."
  export NODE_ENV=production
else
  echo "Deploying to $NODE_ENV environment."
fi

# Configuration
TIMESTAMP=$(date +"%Y%m%d%H%M%S")
BACKUP_DIR="./backups/$TIMESTAMP"
LOG_FILE="./logs/deployment-$TIMESTAMP.log"

# Create necessary directories
mkdir -p ./logs
mkdir -p $BACKUP_DIR

echo "Creating backup directory at $BACKUP_DIR"

# Backup current version
if [ -d "./build" ]; then
  echo "Backing up current build..."
  cp -R ./build $BACKUP_DIR/build
fi

echo "Backing up server configuration..."
cp .env $BACKUP_DIR/.env.backup

# Pull latest changes
echo "Pulling latest changes from repository..."
git pull >> $LOG_FILE 2>&1

# Install backend dependencies
echo "Installing backend dependencies..."
npm ci --only=production >> $LOG_FILE 2>&1

# Build frontend (if in same repository)
if [ -d "../src" ]; then
  echo "Building frontend..."
  cd ..
  npm ci >> $LOG_FILE 2>&1
  npm run build >> $LOG_FILE 2>&1
  
  # Copy build to server directory
  echo "Copying frontend build to server directory..."
  rm -rf ./server/build
  cp -R ./build ./server/
  cd ./server
fi

# Update database (if needed)
echo "Running database migrations (if any)..."
# Add your database migration commands here

# Restart service
echo "Restarting service..."
if command -v pm2 &> /dev/null; then
  pm2 restart server >> $LOG_FILE 2>&1
else
  echo "PM2 not found. Consider installing PM2 for process management."
  # Alternative restart mechanism
  echo "Attempting to restart using Node directly..."
  nohup node server.js > ./logs/server.log 2>&1 &
fi

# Cleanup old backups (keep last 5)
echo "Cleaning up old backups..."
ls -t ./backups | tail -n +6 | xargs -I {} rm -rf "./backups/{}"

echo "==============================="
echo "Deployment completed successfully!"
echo "Deployment log available at: $LOG_FILE"