FROM node:20-alpine

WORKDIR /usr/src/app

COPY . .
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
