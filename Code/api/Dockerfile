#FROM node:alpine3.11
FROM node
WORKDIR /api_clase5
COPY . .
RUN npm install
ENV MONGO_USERNAME mongoadmin
ENV MONGO_PASSWORD mongo_pass
ENV MONGO_HOST dbmongo
EXPOSE 3000 
CMD ["npm","start"]