FROM node:18-alpine

WORKDIR /node-backend

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "start"]