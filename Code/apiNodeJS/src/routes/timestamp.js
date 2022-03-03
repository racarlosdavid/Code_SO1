var express = require('express');
var router = express.Router();
require('dotenv').config()
let fs = require('fs');
const ruta_data_modulo ='/miproc/timestamps';

const server = `${process.env.SERVER_NAME}`;

router.get('/', async function(req, res) {
  let data = fs.readFileSync(ruta_data_modulo, 'utf-8');
  console.log(data)
  const doc = JSON.parse(data)
  res.status(200).json({atendido_por:server, timestamp:doc});
});


module.exports = router;