# pull official base image
FROM node:18-alpine

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json /app/
COPY package-lock.json /app/
COPY src/ /app/src
COPY public/ /app/public
RUN npm ci

EXPOSE 3000

# start app
CMD ["npm", "start"]