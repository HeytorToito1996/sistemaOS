const express = require('express');
const rotas = express.Router();

rotas.get('/',(request,response)=>{
    response.render('inicio');
});

module.exports = rotas;