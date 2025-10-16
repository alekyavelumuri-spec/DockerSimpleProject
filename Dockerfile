FROM node:18

WORKDIR /student-tracker

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node", "server.js"]