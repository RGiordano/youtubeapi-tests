FROM node:13-alpine

WORKDIR /app

# Defining PATH
ENV PATH /app/node_modules/.bin:$PATH

# Moving files
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

# Installing npm dependencies
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# Starting app
CMD ["npm", "start"]
