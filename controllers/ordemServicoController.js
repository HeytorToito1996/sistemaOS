const OrdemServico = require('../models/Ordem')
const Status = require('../models/Status');
const Autorizacao = require('../models/Autorizacao');
const express = require('express');
const router = express.Router();

router.post('/cadastroOS',(request,response)=>{
    let aparelho = request.body.aparelho;
    let defeito = request.body.defeito;
    let servico = request.body.servico;
    let valor = request.body.valor;
    let statusId = request.body.status;
    let observacao = request.body.observacao;
    let autorizado = request.body.autorizado;
    let idCliente = request.body.idCliente;

    OrdemServico.create({
        aparelho:aparelho,
        defeito:defeito,
        servico:servico,
        valor:valor,
        statusId:statusId,
        observacao:observacao,
        autorizado:autorizado,
        idCliente:idCliente
    }).then(()=>{
        response.send('Ordem de Serviço Cadastrada com Sucesso');
    }).catch((erro)=>{
        console.error(erro);
        response.send('Falha ao Cadastrar esta O.S');
    });

});

router.get('/ordens',(request,response)=>{
    OrdemServico.findAll().then((ordens)=>{
        response.send({ordens: ordens});
    })
});

module.exports = router;