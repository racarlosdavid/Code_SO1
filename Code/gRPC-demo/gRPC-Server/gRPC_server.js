var PROTO_PATH = './proto/demo.proto';

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var demo_proto = grpc.loadPackageDefinition(packageDefinition).demo;

/* Conexion a la base de datos */
const mysqlConnection = require('./mysql_connection');

function AddCaso(call, callback) {
  const query = 'INSERT INTO Caso (name,location,age,infected_type,state) VALUES ('+
  '\''+call.request.name+'\','+
  '\''+call.request.location+'\','+
  +call.request.age+','+
  '\''+call.request.infected_type+'\','+
  '\''+call.request.state+'\');';
  
  mysqlConnection.query(query, function(err, rows, fields) {
    if (err) throw err;
    callback(null, {message: 'Caso insertado en la base de datos'});
  });
}

function ListarCasos(call) {
  const query = 'SELECT name,location,age,infected_type,state FROM Caso;';

  mysqlConnection.query(query, function(err, rows, fields) {
    if (err) throw err;
    //console.log(rows.length)
    for(const data of rows){
      //console.log(data);
      call.write(data);
    }
    call.end();
  });
  
}

function main() {
  var server = new grpc.Server();
  server.addService(demo_proto.Casos.service, {
    AddCaso: AddCaso,
    ListarCasos: ListarCasos
  });
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log('gRPC server on port 50051')
  });
}

main();
