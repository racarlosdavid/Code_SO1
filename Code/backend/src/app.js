const express = require("express");
const cors = require("cors");
const app = express();
require('./routes/database');
//settings
app.set("port", 5000);

//middlewares
app.use(cors());
app.use(express.json({ limit: "50mb" }));
//app.use(express.urlencoded({ limit: "50mb" }));

//routes
app.use("/", require("./routes/servicios"));

app.listen(app.get('port'), () => {
    console.log('Servidor en el puerto', app.get('port'));
  });
  
  module.exports = app;
