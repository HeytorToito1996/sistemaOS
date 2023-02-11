const Cliente = require('../models/Cliente');
const cpfvalid = require('cpf-check');
const express = require('express');
const router = express.Router();
const validator = require('email-validator');
//Cadastrar Novo Cliente
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
        Cliente.findOne({where:{cpf:cpf}})
        .then(clienteLocalizado =>{
            if(clienteLocalizado){
                response.render('mensagem',{mensagem:'Já existe um Cliente Cadastrado com esse CPF'});
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
                        response.render('mensagem',{mensagem:'Cliente Cadastrado com Sucesso'});
                    }).catch((erro)=>{
                        console.error(erro);
                        response.render('mensagem',{mensagem:'Falha ao Cadastrar Cliente'});
                    })
            }
        });
    }

});

//Atualizar dados Clientes
router.post('/atualizarClientes',(request,response)=>{
    let nome = request.body.nome;
    let endereco = request.body.endereco;
    let cpf = request.body.cpf;
    let telefone = request.body.telefone;
    let email = request.body.email;
    let observacao = request.body.observacao;
    let id = request.body.id;

    if (!cpfvalid.validate(cpf)) {
        response.send('CPF Incorreto');          
    } else if(!validator.validate(email)){
        response.send('E-Mail Inválido');
    }
    
    else {
            Cliente.update({
                nome:nome,
                endereco:endereco,
                cpf:cpf,
                telefone:telefone,
                email:email,
                observacao:observacao,
        },
        {
            where:{id:id}
        }).then(()=>{
            response.render('mensagem',{mensagem:'Cliente Atualizado com Sucesso'});
        }).catch((erro)=>{
            console.error(erro);
            response.render('mensagem',{mensagem:'Falha ao Atualizar os Dados do Cliente'});        
        })
    }

})

router.get('/clientes',(request,response)=>{
    Cliente.findAll({raw:true,nest:true}).then((clientes)=>{
        //console.log(clientes);
        response.render('listarCliente',{clientes: clientes});
    });
});


module.exports = router;