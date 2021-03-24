FROM node:14

WORKDIR /usr/src/app

COPY . ./
RUN npm install --silent
RUN npm install react-scripts -g
RUN npm run build
RUN yarn global add serve

EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]