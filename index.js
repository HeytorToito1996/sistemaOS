const porta = 3000;
const express = require('express');
const app = express();
const bodyParser =  require('body-parser');
//Importação das Models
const Cliente = require('./models/Cliente');
const Status = require('./models/Status');
const Autorizacao = require('./models/Autorizacao');
const OrdemServico = require('./models/Ordem');
//bodyparser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//rotas
app.get('/',(request,response)=>{
    response.send('Página Inicial');
});
//conexão com o banco de dados
const conexao = require('./models/Conexao');
const {request} = require('http');
//Rotas para Cadastro de Cliente e OS's 
app.post('/cadastroCliente',(request,response)=>{
    let nome = request.body.nome;
    let endereco = request.body.endereco;
    let cpf = request.body.cpf;
    let telefone = request.body.telefone;
    let email = request.body.email;
    let observacao = request.body.observacao;

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
});

app.post('/cadastroOS',(request,response)=>{
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

//rotas para exibição
app.get('/clientes',(request,response)=>{
    Cliente.findAll().then((clientes)=>{
        response.send({clientes: clientes});
    });
})

app.get('/ordens',(request,response)=>{
    OrdemServico.findAll().then((ordens)=>{
        response.send({ordens: ordens});
    })
})

app.listen(porta,()=>{
    console.log('Rodando...');
})