import express from "express";
import dotenv from 'dotenv';


dotenv.config();

const app = express();
const port = 4004;


app.use(express.json());



app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})