FROM node:16.13-alpine

WORKDIR /packages-server

COPY package* ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]