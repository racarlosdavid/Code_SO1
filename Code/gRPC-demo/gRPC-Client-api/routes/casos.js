var express = require('express');
var router = express.Router();
const client = require('../gRPC_client')

router.post('/agregarCaso',  function(req, res) {
    const data_caso = {
        name : req.body.name,
        location : req.body.location,
        age : req.body.age,
        infected_type : req.body.infected_type,
        state : req.body.state
    }
    
    client.AddCaso(data_caso, function(err, response) {
        res.status(200).json({mensaje: response.message})
    });
});

router.get('/listarCasos',  function(req, res) {
    const rows = [];

    const call = client.ListarCasos();
    call.on('data', function(data) {
        rows.push(data);
    });
    call.on('end', function() {
        console.log('Data obtenida con exito');
        res.status(200).json({data:rows});
    });
    call.on('error', function(e) {
        console.log('Error al obtener la data',e);
    });
    /*
    call.on('status', function(status) {
        // process status
    });
    */
});

module.exports = router;
