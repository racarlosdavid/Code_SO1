package main

import (
	"context"
	"log"
	"net"
	"strconv"
	"google.golang.org/grpc"

	amqp "github.com/rabbitmq/amqp091-go"
	pb "github.com/racarlosdavid/demo-gRPC/proto"
)

type server struct {
	pb.UnimplementedOperacionAritmeticaServer
}

func (s *server) OperarValores(ctx context.Context, in *pb.OperacionRequest) (*pb.OperacionReply, error) {
	log.Printf("Se va a %v : el valor %v con el valor %v", in.GetOperacion(),in.GetValor1(),in.GetValor2())

	//Paso el valor1 a int
	intValor1, err := strconv.Atoi(in.GetValor1())
	if err != nil {
		log.Fatalf("Error al convertir a int: %v", err)
	}
	//Paso el valor2 a int
	intValor2, err := strconv.Atoi(in.GetValor2())
	if err != nil {
		log.Fatalf("Error al convertir a int: %v", err)
	}

	var result = 0;
	if (in.GetOperacion() == "suma") {
		result = suma(intValor1,intValor2)
	} else if (in.GetOperacion() == "resta") {
		result = resta(intValor1,intValor2)
	}else if (in.GetOperacion() == "multiplicacion") {
		result = multiplicacion(intValor1,intValor2)
	}else if (in.GetOperacion() == "division") {
		result = division(intValor1,intValor2)
	}

	strResultado := strconv.Itoa(result)
	sendResultado(strResultado)
	//log.Printf("Received: %v", in.GetOperacion())
	return &pb.OperacionReply{Resultado: "El resultado al realizar la " + in.GetOperacion()+" es: "+strResultado}, nil
}

func main() {
	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterOperacionAritmeticaServer(s, &server{})
	log.Printf("server listening at %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}

func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}

func sendResultado(strResultado string) {
	conn, err := amqp.Dial("amqp://guest:guest@168.61.156.154:5672/")
	failOnError(err, "Failed to connect to RabbitMQ")
	defer conn.Close()

	ch, err := conn.Channel()
	failOnError(err, "Failed to open a channel")
	defer ch.Close()

	q, err := ch.QueueDeclare(
		"task_queue", // name
		true,         // durable
		false,        // delete when unused
		false,        // exclusive
		false,        // no-wait
		nil,          // arguments
	)
	failOnError(err, "Failed to declare a queue")

	body := strResultado
	err = ch.Publish(
		"",     // exchange
		q.Name, // routing key
		false,  // mandatory
		false,
		amqp.Publishing{
			DeliveryMode: amqp.Persistent,
			ContentType:  "text/plain",
			Body:         []byte(body),
		})
	failOnError(err, "Failed to publish a message")
	log.Printf(" [x] Sent %s", body)
}


//Funciones de Operaciones
func suma(num1, num2 int) int {
	return num1 + num2; 
}

func resta(num1, num2 int) int {
	return num1 - num2; 
}

func multiplicacion(num1, num2 int) int {
	return num1 * num2; 
}

func division(num1, num2 int) int {
	return num1 / num2; 
}
