const Cliente = require('../models/Cliente');
const cpfvalid = require('cpf-check');
const express = require('express');
const router = express.Router();
const validator = require('email-validator');
router.post('/cadastroCliente',(request,response)=>{
    let nome = request.body.nome;
    let endereco = request.body.endereco;
    let cpf = request.body.cpf;
    let telefone = request.body.telefone;
    let email = request.body.email;
    let observacao = request.body.observacao;

    if (!cpfvalid.validate(cpf)) {
        response.send('CPF Incorreto');
    } else if(!validator.validate(email)){
        response.send('E-Mail Inválido');
    } 

    else {
        Cliente.create({
            nome:nome,
            endereco:endereco,
            cpf:cpf,
            telefone:telefone,
            email:email,
            observacao:observacao
        }).then(()=>{
            response.send('Cliente Cadastrado com Sucesso');
        }).catch((erro)=>{
            console.error(erro);
            response.send('Falha ao Cadastrar este Cliente');
        })
    }
    
});

router.get('/clientes',(request,response)=>{
    Cliente.findAll().then((clientes)=>{
        response.send({clientes: clientes});
    });
});

module.exports = router;