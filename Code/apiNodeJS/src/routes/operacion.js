var express = require('express');
var router = express.Router();
require('dotenv').config()
const server = `${process.env.SERVER_NAME}`;

router.post('/', async function(req, res) {
  const { op, val1, val2 } = req.body;
  let result = 0;
  switch (op) {
    case '+':
      result = val1 + val2;
      break;
    case '-':
      result = val1 - val2;
      break;
    case '*':
      result = val1 * val2;
      break;
    case '/':
      result = val1 / val2;
      break;
  }
  res.status(200).json({atendido_por:server,resultado: result});
});


module.exports = router;