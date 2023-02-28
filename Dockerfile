FROM node:alpine

# create app directory
RUN mkdir -p /app
WORKDIR /app

# install dependencies
COPY package*.json .
RUN npm install

# copy the source file
COPY . .

# build app
RUN npm run build
EXPOSE 3000

# run app
CMD ["npm", "run", "dev"]