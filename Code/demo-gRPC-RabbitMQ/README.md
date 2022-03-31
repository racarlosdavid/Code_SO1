# demo-gRPC
## Iniciamos el proyecto

`mkdir demo-gRPC`

`cd demo-gRPC`

`go mod init github.com/racarlosdavid/demo-gRPC`

## Instalar dependencias gRPC

`go get -u google.golang.org/grpc`

`go get github.com/golang/protobuf/proto@v1.5.2`

`go get google.golang.org/protobuf/reflect/protoreflect@v1.27.1`

`go get google.golang.org/protobuf/runtime/protoimpl@v1.27.1`

## Instalar dependencias para compilar el .proto

`go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.26`

`go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.1`

`export PATH="$PATH:$(go env GOPATH)/bin"`

`protoc --go_out=. --go_opt=paths=source_relative --go-grpc_out=. --go-grpc_opt=paths=source_relative proto/demo.proto`

## API - Instalamos gorilla mux para el server
`go get -u github.com/gorilla/mux`

## comandos utilizados para RabbitMQ
docker run -it -d --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.9-management

go get github.com/rabbitmq/amqp091-go