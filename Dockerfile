FROM node:16-alpine
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
ENV PORT 8080
CMD npm start
EXPOSE 8080
