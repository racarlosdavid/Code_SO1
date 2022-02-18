var express = require('express');
var router = express.Router();
const mongoConnection = require('../mongo_connection');
let fs = require('fs');
const ruta_data_modulo ='/miproc/timestamps';

router.get('/obtenerActual', async function(req, res, next) {
  let data = fs.readFileSync(ruta_data_modulo, 'utf-8');
  console.log(data)
    try {
      await mongoConnection.connect();
      const database = mongoConnection.db("clase5");
      const coleccion = database.collection("hora");
    
      const doc = JSON.parse(data)
      const result = await coleccion.insertOne(doc);
      console.log(`Hora insertada en la base de datos con el _id: ${result.insertedId}`);
      res.status(200).json(doc);
    } catch(err) {
      res.status(500).json({ message: "Error en la conexion de la base de datos"+err });
    } finally {
      await mongoConnection.close();
    }
});

router.get('/obtenerTodo', async function(req, res, next) {
  console.log(req.body)
  try {
    await mongoConnection.connect();
    const database = mongoConnection.db("clase5");
    const coleccion = database.collection("hora");

    const cursor = coleccion.find({}, { _id: 0, timestamp: 1});
    // print a message if no documents were found
    if ((await cursor.count()) === 0) {
      console.log("No documents found!");
      res.status(500).json({ message: "Error! Documento no encontrado" });
    }
       
    var data = [];
    await cursor.forEach(
      element =>
      data.push(element)
    );
   
    res.status(200).send(data);

  } catch (err) {
    res.status(500).json({ message: "Error en la conexion de la base de datos"+err }); 
  } finally {
    await mongoConnection.close();
  }
});

module.exports = router;