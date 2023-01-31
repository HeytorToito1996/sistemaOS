const porta = 3000;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const clienteController = require('./controllers/clienteController');
const ordemServicoController = require('./controllers/ordemServicoController');

//bodyparser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//rotas
app.use('/',clienteController)
app.use('/',ordemServicoController)


app.listen(porta,()=>{
    console.log('Rodando...');
});