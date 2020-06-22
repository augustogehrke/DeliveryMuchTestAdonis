
FROM node:12.18.1

RUN mkdir -p /opt/api-augusto

WORKDIR /opt/api-augusto

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3333


CMD ["npm", "start"]
