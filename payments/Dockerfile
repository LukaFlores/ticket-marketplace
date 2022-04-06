FROM node:16-alpine
ENV CI=true
WORKDIR /usr/app
COPY package.json ./
RUN npm install --only=prod
COPY ./ ./
CMD ["npm", "start"]