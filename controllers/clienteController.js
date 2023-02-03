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
        Cliente.findOne({where:{cpf:cpf}})
        .then(clienteLocalizado =>{
            if(clienteLocalizado){
            response.send('Já Existe um Cliente Cadastrado com esse CPF!');
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
    }

});

router.put('/atualizarClientes/:id',(request,response)=>{
    let nome = request.body.nome;
    let endereco = request.body.endereco;
    let cpf = request.body.cpf;
    let telefone = request.body.telefone;
    let email = request.body.email;
    let observacao = request.body.observacao;
    let id = request.params.id;

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
            response.send('Cliente Atualizado com Sucesso');
        }).catch((erro)=>{
            console.error(erro);
            response.send('Falha ao Atualizar os Dados deste Cliente');        
        })
    }

})

router.get('/clientes',(request,response)=>{
    Cliente.findAll({raw:true,nest:true}).then((clientes)=>{
        //console.log(clientes);
        response.render('listarCliente',{clientes: clientes});
    });
});

router.get('/buscaCliente/:cpf',(request,response)=>{
    let busca = request.params.cpf;

    Cliente.findAll({where:{cpf:busca}}).then((clientes)=>{
        response.send({clientes: clientes});
    }).catch((erro)=>{
        //console.error(erro);
        response.send('Não Há Cliente com o CPF Informado');
    })
});

module.exports = router;