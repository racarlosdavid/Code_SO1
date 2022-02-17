var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.status(200).send("API - SO1 CLASE 5");
});

module.exports = router;