# Specify a base image
FROM node:alpine

WORKDIR /usr/app

#Copy current directory into container directory
COPY ./package.json ./
#Install a dependencies
RUN npm install
COPY ./ ./

#Default command
CMD [ "npm", "start" ]