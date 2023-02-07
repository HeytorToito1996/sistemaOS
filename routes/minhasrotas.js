const express = require('express');
const rotas = express.Router();
const Cliente = require('../models/Cliente');
const OrdemServico = require('../models/Ordem');
const Status = require('../models/Status');
const Autorizacao = require('../models/Autorizacao');
const { or } = require('sequelize');
rotas.get('/',(request,response)=>{
    response.render('inicio');
});

rotas.get('/cadastrarCliente',(request,response)=>{
    response.render('cadastrarCliente');
});

rotas.get('/cadastrarOS',(request,response)=>{
    response.render('cadastrarOS');
})

//Encaminhar dados já Cadastrados para o formulário
rotas.get('/atualizaCliente/:id',async (request,response)=>{
    const busca = request.params.id;
    const [autorizacao,status] = await Promise.all([
        Autorizacao.findAll({raw:true,nest:true}),
        Status.findAll({raw:true,nest:true})
    ]);

    const ordem = await OrdemServico.findOne({where:{id:busca}});

    const ordemWithStatus = {
        ...ordem,
        autorizacao: autorizacoes.find(a => a.id === ordem.autorizado).nome,
        status: statuses.find(s => s.id === ordem.statusId).nome
    };

    response.render('listarOS',{ordens: ordemWithStatus});
});

rotas.get('/atualizaOrdem/:id',async (request,response)=>{
    const busca = request.params.id;
    const autorizacaoMap = await Autorizacao.findAll({raw:true,nest:true});
    const statusMap = await Status.findAll({raw:true,nest:true});
    const ordem = await OrdemServico.findOne({where:{id:busca}});
    const ordemWithStatus = {
        ...ordem,
        autorizacao: autorizacaoMap.find(a => a.id === ordem.autorizado).nome,
        status: statusMap.find(s=> s.id === ordem.statusId).nome

    };
    console.log(ordemWithStatus);
    response.render('obterOS',{ordem:[ordemWithStatus]});
});


module.exports = rotas;