FROM node:16-alpine
WORKDIR '/var/www/app'
# EXPOSE 3000

# # Use latest version of npm
# RUN npm install npm@latest -g

# COPY package.json package-lock.json* ./

# RUN npm install --no-optional && npm cache clean --force

# # copy in our source code last, as it changes the most
# WORKDIR /usr

# COPY . .

# CMD ["node", "app.js"]
