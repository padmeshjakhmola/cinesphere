# Development stage
FROM node:18 AS base

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

FROM base AS development
EXPOSE 3000
CMD ["tail", "-f", "/dev/null"]

# Production stage
FROM base AS production
EXPOSE 3000
CMD ["npm", "run", "start"]
