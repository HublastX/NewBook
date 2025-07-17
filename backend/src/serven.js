const express = require('express');
const app = express();
const port = 4000;

app.get('/', (req, res)=>{
    res.status(200).json({msg: 'Deu certo!'})
})

app.listen(port,()=>{
    console.log('servidor rodando na porta:',port)
})


