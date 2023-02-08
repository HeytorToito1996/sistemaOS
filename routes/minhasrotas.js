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

rotas.get('/cadastrarOS',async(request,response)=>{
    const listaClientes = await Cliente.findAll({raw:true,nest:true});
    response.render('cadastrarOS',{listaClientes:listaClientes});
})

//Encaminhar dados já Cadastrados para o formulário
rotas.get('/atualizaCliente/:id',async(request,response)=>{
    const busca = request.params.id;
    const dados = await Cliente.findOne({where:{id:busca}});
    console.log(dados);
    response.render('obterDados',{dados:[dados]});
});

rotas.get('/atualizaOrdem/:id',async(request,response)=>{
    const busca = request.params.id;
    const dadosOs = await OrdemServico.findOne({where:{id:busca}});
    const statusList = await Status.findAll({raw:true,nest:true});
    const autorizacaoList = await Autorizacao.findAll({raw:true,nest:true});
    console.log(dadosOs,statusList,autorizacaoList);
    response.render('obterOS',{ordem:[dadosOs],status:statusList,autorizado:autorizacaoList});
});


module.exports = rotas;