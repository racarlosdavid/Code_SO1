package main

import (
	"fmt" //solo se importa
    "net/http" //solo se importa
    "log" //solo se importa
	"encoding/json" //solo se importa
	"context" //solo se importa
	"time" //solo se importa
	"bytes" //solo se importa
	"github.com/gorilla/mux" //se instala 
	"go.mongodb.org/mongo-driver/bson"//se instala 
	"go.mongodb.org/mongo-driver/mongo"//se instala 
	"go.mongodb.org/mongo-driver/mongo/options"//se instala 
)

var MONGO = ""

func IndexHandler(w http.ResponseWriter, r *http.Request) {
    w.Write([]byte("API GO - CLASE 7!\n"))
}

func save(w http.ResponseWriter, r *http.Request) {
	//PARCEO EL JSON QUE ME ENVIARON
	buf := new(bytes.Buffer)
    buf.ReadFrom(r.Body)
    str := buf.String()

	var doc interface{}
	err := bson.UnmarshalExtJSON([]byte(str), true, &doc)
	if err != nil {
		log.Fatal(err)
	}

	//CONEXION A LA BASE DE DATOS E INSERCION DE DATOS
	client, err := mongo.NewClient(options.Client().ApplyURI(MONGO))
	if err != nil {
		log.Fatal(err)
	}
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(ctx)

	collection := client.Database("Clase7").Collection("data")
	res, insertErr := collection.InsertOne(ctx, doc)
		if insertErr != nil {
			log.Fatal(insertErr)
		}
    fmt.Println(res);

	//RESPUESTA
	w.Header().Set("Content-Type", "application/json")
   	w.Header().Set("Access-Control-Allow-Origin", "*")
   	//w.Write(data)
	json.NewEncoder(w).Encode(struct {
		Mensaje string `json:"mensaje"`
	}{Mensaje: "Data alamecenada en la base de datos"})


}

func obtenerTodo(w http.ResponseWriter, r *http.Request) {
	//CONEXION A LA BASE DE DATOS E INSERCION DE DATOS
	client, err := mongo.NewClient(options.Client().ApplyURI("MONGO"))
	if err != nil {
		log.Fatal(err)
	}
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(ctx)

	collection := client.Database("Clase7").Collection("data")

	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	
	var data []bson.M
	if err = cursor.All(ctx, &data); err != nil {
		log.Fatal(err)
	}
	
	jsonData, err := json.Marshal(data)
	if err != nil {
		log.Fatal(err)
	}

	//RESPUESTA
	w.Header().Set("Content-Type", "application/json")
   	w.Header().Set("Access-Control-Allow-Origin", "*")
   	w.Write(jsonData)
	 
}

func main() {
	router := mux.NewRouter().StrictSlash(false)
	router.HandleFunc("/", IndexHandler)
	router.HandleFunc("/obtenerTodo",obtenerTodo).Methods("GET")
	router.HandleFunc("/save",save).Methods("POST")
    log.Println("Listening at port 2000") 
	log.Fatal(http.ListenAndServe(":2000", router))
}