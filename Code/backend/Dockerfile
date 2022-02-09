FROM node:17
WORKDIR /backendEjemplo
COPY . .
RUN npm install
ENV MONGO_HOST localhost
ENV MONGO_USERNAME mongoadmin
ENV MONGO_PASSWORD So1pass1S_2022
EXPOSE 5000
CMD ["npm","start"]