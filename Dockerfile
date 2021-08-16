#Specify a base image
FROM node:16-alpine

#Specify a working directory
WORKDIR /usr/app

#Copy the dependencies file
COPY ./package.json ./

#Install dependencies
RUN npm install

#Copy remaining files
COPY ./ ./

#Default command
CMD ["npm","start"]
