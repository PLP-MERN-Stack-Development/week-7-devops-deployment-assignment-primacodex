#!/bin/bash

# MERN Stack Deployment Script
# This script automates the deployment of the MERN stack application with monitoring

# Exit immediately if a command exits with a non-zero status
set -e

echo "============================================="
echo "   MERN Stack Application Deployment"
echo "============================================="

# Define color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Step 1: Checking prerequisites...${NC}"

# Check if Docker is installed
if ! [ -x "$(command -v docker)" ]; then
  echo -e "${RED}Error: Docker is not installed.${NC}" >&2
  echo "Please install Docker and try again."
  exit 1
fi

# Check if Docker Compose is installed
if ! [ -x "$(command -v docker-compose)" ]; then
  echo -e "${RED}Error: Docker Compose is not installed.${NC}" >&2
  echo "Please install Docker Compose and try again."
  exit 1
fi

echo -e "${GREEN}Prerequisites satisfied!${NC}"

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
  echo -e "${YELLOW}Creating .env file...${NC}"
  cat > .env << EOL
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb://mongo:27017/mern-deployment
JWT_SECRET=$(openssl rand -hex 32)
JWT_EXPIRE=30d
EOL
  echo -e "${GREEN}.env file created!${NC}"
else
  echo -e "${GREEN}.env file already exists.${NC}"
fi

echo -e "${YELLOW}Step 2: Building Docker images...${NC}"
docker-compose build

echo -e "${YELLOW}Step 3: Starting services...${NC}"
docker-compose up -d

echo -e "${YELLOW}Step 4: Checking service status...${NC}"
sleep 5 # Give services a moment to start

# Check if all services are running
if docker-compose ps | grep -q "Up"; then
  echo -e "${GREEN}Services are running!${NC}"
else
  echo -e "${RED}Some services failed to start. Please check the logs.${NC}"
  docker-compose logs
  exit 1
fi

echo -e "${GREEN}==============================================${NC}"
echo -e "${GREEN}   MERN Stack Application Deployed Successfully!${NC}"
echo -e "${GREEN}==============================================${NC}"
echo ""
echo -e "Frontend:  ${YELLOW}http://localhost:3000${NC}"
echo -e "API:       ${YELLOW}http://localhost:5000${NC}"
echo -e "MongoDB:   ${YELLOW}mongodb://localhost:27017${NC}"
echo -e "Prometheus:${YELLOW}http://localhost:9090${NC}"
echo -e "Grafana:   ${YELLOW}http://localhost:3001${NC}"
echo ""
echo -e "Grafana credentials: admin / admin"
echo ""
echo -e "${YELLOW}To stop the services:${NC} docker-compose down"
echo -e "${YELLOW}To view logs:${NC} docker-compose logs -f"
echo ""