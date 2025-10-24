# Use official Node LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only package files first (for better layer caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of your source code
COPY . .

# Expose backend port
EXPOSE 5000

# Default command
CMD ["npm", "start"]
