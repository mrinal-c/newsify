# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container to /usr/src/app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install application dependencies
RUN npm ci

# Copy the rest of the application code into the container
COPY . .

# Expose the port that the Express app will run on (default is 3000)
EXPOSE 5000

# Define the command to start your Express.js application
CMD ["node", "index.js"]
