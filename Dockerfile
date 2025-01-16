FROM node:18.19.0

EXPOSE 3000
WORKDIR /app

COPY package*.json ./
RUN npm install --force

COPY . .

CMD ["npm", "start"]