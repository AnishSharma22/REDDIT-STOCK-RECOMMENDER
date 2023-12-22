# Use an appropriate base image for your backend (e.g., Node.js)
FROM node:latest

# Set the working directory
WORKDIR /usr/src/app

# Copy the backend files to the container
COPY . .

RUN npm install

EXPOSE 3000

# Specify commands to start your backend server
CMD ["node", "index.js"]
