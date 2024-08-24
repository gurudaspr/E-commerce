# Root Dockerfile

# Define a base image
FROM node:20.15.1-alpine

# Set work directory
WORKDIR /app

# Copy all services
COPY auth-service /app/auth-service
COPY product-service /app/product-service
COPY inventory-service /app/inventory-service

# Install dependencies for each service
WORKDIR /app/auth-service
RUN npm install

WORKDIR /app/product-service
RUN npm install

WORKDIR /app/inventory-service
RUN npm install

# Default command
CMD ["sh"]
