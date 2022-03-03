FROM golang:1.16.2-alpine3.13
WORKDIR /app/src
ENV GOPATH=/app
COPY . /app/src
RUN go get -u github.com/gorilla/mux
RUN go get go.mongodb.org/mongo-driver/mongo
RUN go build -o Server .
EXPOSE 2000
CMD ["./Server"]