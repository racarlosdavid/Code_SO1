package main

import (
	"context"
	"log"
	"time"

	"google.golang.org/grpc"
	pb "github.com/racarlosdavid/demo-gRPC/proto"
)

func main() {
	// Set up a connection to the server.
	conn, err := grpc.Dial("localhost:50051", grpc.WithInsecure(), grpc.WithBlock())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()
	c := pb.NewOperacionAritmeticaClient(conn)

	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	r, err := c.OperarValores(ctx, &pb.OperacionRequest{
		Operacion: "resta",
		Valor1:"143",
		Valor2:"7",
	})
	if err != nil {
		log.Fatalf("could not greet: %v", err)
	}
	log.Printf("Greeting: %s", r.GetResultado())
}
