FROM node:8
WORKDIR /
COPY package.json /
RUN npm install
COPY . /
CMD npm run start
EXPOSE 3000
