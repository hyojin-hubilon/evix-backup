FROM node:20-alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm ci -qy

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
