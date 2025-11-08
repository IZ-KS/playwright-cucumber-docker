FROM mcr.microsoft.com/playwright:v1.56.1-jammy

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all project files
COPY . .

# Create test-results directory
RUN mkdir -p test-results

# Run tests
CMD ["npm", "test"]