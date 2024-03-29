const Cliente = require('../models/Cliente');
const OrdemServico = require('../models/Ordem')
const Status = require('../models/Status');
const Autorizacao = require('../models/Autorizacao');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const pdfkit = require('pdfkit');
const { cpf } = require('cpf-cnpj-validator');
const { Op } = require('sequelize');
const recibo = new pdfkit();
const hoje = new Date();
const ano = hoje.getFullYear();
let mes = hoje.getMonth() + 1;
let dia = hoje.getDate();

if (dia < 10) dia = '0' + dia;
if (mes < 10) mes = '0' + mes;

router.post('/cadastroOS',(request,response)=>{
    let aparelho = request.body.aparelho;
    let defeito = request.body.defeito;
    let estado = request.body.estado;
    let servico = request.body.servico;
    let valor = request.body.valor;
    let idCliente = request.body.cliente;

    

    OrdemServico.create({
        aparelho:aparelho,
        defeito:defeito,
        estado:estado,
        servico:servico,
        valor:valor,
        statusId:2,
        autorizado:1,
        idCliente:idCliente
    }).then(()=>{
        const filename = `recibo-${Date.now()}.pdf`;
        recibo.pipe(fs.createWriteStream(`recibos/${filename}`));
        recibo.font('Helvetica-Bold').text('Ordem de Serviço',{
            align:'center',
            stroke: true,
            underline: true
        });

        recibo.moveDown();
        recibo.font('Helvetica').text(`Aparelho: ${aparelho}`);
        recibo.text(`Defeito: ${defeito}`);
        recibo.text(`Estado Atual: ${estado}`);
        recibo.text(`Serviço: ${servico}`);
        recibo.text(`Valor: R$ ${valor}`);
        recibo.text(`Garantia: 30() 60() 90()`);
        recibo.text(`Data: ${dia}/${mes}/${ano}`);
        recibo.moveDown();
        recibo.moveDown();
        recibo.moveDown();
        recibo.moveDown();
        recibo.moveDown();
        recibo.moveDown();
        recibo.moveDown();
        recibo.moveDown();
        recibo.moveDown();
        recibo.moveDown();
        recibo.moveDown();
        recibo.moveDown();
        recibo.text(`Itaquaquecetuba ,${dia}/${mes}/${ano} - Assinatura do Cliente:  _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _`, {
            align: 'left'
        });
        recibo.end();

        response.render('mensagem',{mensagem:'Ordem de Serviço gerada com Sucesso'});
    }).catch((erro)=>{
        console.error(erro);
        response.render('mensagem',{mensagem:'Falha ao Gerar esta Ordem de Serviço'});
    });


});


router.get('/ordens', (request, response) => {
    Cliente.findAll({raw:true,nest:true}).then((clienteMap)=>{
        Autorizacao.findAll({raw:true,nest:true}).then((autorizacaoMap) =>{

            Status.findAll({ raw: true, nest: true }).then(function(statusMap) {
    
            OrdemServico.findAll({ raw: true, nest: true }).then((ordens) => {
                const ordensWithStatus = ordens.map(ordem => {  
                ordem.nome = clienteMap.find(n=> n.id === ordem.idCliente).nome;     
                ordem.autorizacao = autorizacaoMap.find(a=> a.id === ordem.autorizado).nome;   
                ordem.status = statusMap.find(s => s.id === ordem.statusId).nome;
                return ordem;
            });
    
                //console.log(ordens);
                response.render('listarOs', { ordens: ordensWithStatus });
            });
            });
        });
    })
});
  

router.post('/atualizarOs/',(request,response)=>{
    let aparelho = request.body.aparelho;
    let defeito = request.body.defeito;
    let estado = request.body.estado;
    let servico = request.body.servico;
    let valor = request.body.valor;
    let statusId = request.body.status;
    let autorizado = request.body.autorizacao;
    let id = request.body.id;

    OrdemServico.update({
        aparelho:aparelho,
        defeito:defeito,
        estado:estado,
        servico:servico,
        valor:valor,
        statusId:statusId,
        autorizado:autorizado,
    },
    {where:{id:id}}).then(()=>{
        const filename = `recibo-${Date.now()}.pdf`;
        recibo.pipe(fs.createWriteStream(`recibos/${filename}`));
        recibo.font('Helvetica-Bold').text('Ordem de Serviço',{
            align:'center',
            stroke: true,
            underline: true
        });

        recibo.moveDown();
        recibo.font('Helvetica').text(`Aparelho: ${aparelho}`);
        recibo.text(`Defeito: ${defeito}`);
        recibo.text(`Estado Atual: ${estado}`);
        recibo.text(`Serviço: ${servico}`);
        recibo.text(`Valor: R$ ${valor}`);
        recibo.text(`Garantia: 30() 60() 90()`);
        recibo.text(`Data: ${dia}/${mes}/${ano}`);
        recibo.moveDown();
        recibo.moveDown();
        recibo.moveDown();
        recibo.moveDown();
        recibo.moveDown();
        recibo.moveDown();
        recibo.moveDown();
        recibo.moveDown();
        recibo.moveDown();
        recibo.moveDown();
        recibo.moveDown();
        recibo.moveDown();
        recibo.text("Assinatura do Cliente:  _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _", {
            align: 'left'
        });
        recibo.end();

        response.render('mensagem',{mensagem:'Ordem de Serviço Atualizada com Sucesso'});
    }).catch((erro)=>{
        console.error(erro);
        response.render('mensagem',{mensagem:'Falha ao atualizar OS'});
    });

});

router.get('/buscarOrdem',async(request,response)=>{
    const busca = request.query.busca;
    Cliente.findAll({raw:true,nest:true}).then((clienteMap)=>{
        Autorizacao.findAll({raw:true,nest:true}).then((autorizacaoMap) =>{

            Status.findAll({ raw: true, nest: true }).then(function(statusMap) {
    
            OrdemServico.findAll({where:{[Op.or]:[{id:busca},{idCliente:busca}]}}).then((ordens) => {
                const ordensWithStatus = ordens.map(ordem => {  
                ordem.nome = clienteMap.find(n=> n.id === ordem.idCliente).nome;     
                ordem.autorizacao = autorizacaoMap.find(a=> a.id === ordem.autorizado).nome;   
                ordem.status = statusMap.find(s => s.id === ordem.statusId).nome;
                return ordem;
            });
    
                //console.log(ordens);
                response.render('encontrarOs', { dados: ordensWithStatus });
            });
            });
        });
    })
});

module.exports = router;