# Define image to build from Docker. Optimized for Node.
# use the latest LTS (long term support) version 12 of node available from the Docker Hub
FROM node:12 

# Set working directory to /app so we can execute commands in it
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/

# A wildcard* is used to ensure both package.json AND 
#package-lock.json are copied where available (npm@5+)
COPY package*.json ./

# Install dependencies 
RUN npm install 

# Bundle app source 
COPY . .

# Declare port 
ENV PORT=8080

# Expose port mapped by the docker daemon
EXPOSE 8080 3000

# Run file
CMD [ "npm", "run", "dev" ]