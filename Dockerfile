
# Setup and build the client

FROM node:20-alpine as client

WORKDIR /usr/app/client/
COPY client/package*.json ./
RUN npm install -qy
COPY client/ ./
RUN npm run build

# Setup the server

FROM node:20-alpine

WORKDIR /usr/app/
COPY --from=client /usr/app/client/dist/ ./client/build/

WORKDIR /usr/app/server/
COPY server/package*.json ./
RUN npm install -qy
COPY server/ ./

#internal network 사용하기 때문에 expose 필요없음
#ENV PORT 48001 
#EXPOSE 48001

CMD ["npm", "start"]
