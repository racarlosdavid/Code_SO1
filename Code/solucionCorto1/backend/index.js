import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import 'dotenv/config'
const app = express();

app.use(cors())
app.use(bodyParser.json({type: 'application/json'}))


app.get("/",(req,res) =>{
    res.send("<h1>Corto 1</h1>")
})

app.get("/nota",(req,res) =>{
    const name = 'Solucion';
    const carnet = process.env.CARNET;
    const nota = "100";
    res.json({"carnet":carnet, "nombre":name, "nota":nota})
})

app.listen(5001,() =>{
    console.log('Servidor escuchando en puerto 5001')
})