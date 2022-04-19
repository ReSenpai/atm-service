FROM node
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm install pm2 -g
COPY . .
ENV PORT 3000
EXPOSE $PORT
CMD ["npm", "run", "start"]