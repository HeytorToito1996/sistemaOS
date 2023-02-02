const OrdemServico = require('../models/Ordem')
const Status = require('../models/Status');
const Autorizacao = require('../models/Autorizacao');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const pdfkit = require('pdfkit');
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
        recibo.text(`Serviço: ${servico}`);
        recibo.text(`Valor: R$ ${valor.toFixed(2)}`);
        recibo.text(`Observação: ${observacao}`);
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
        recibo.text(`Itaquaquecetuba ,${dia}/${mes}/${ano} - Assinatura do Cliente:  _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _`, {
            align: 'left'
        });
        recibo.end();

        response.send('Ordem de Serviço gerada com Sucesso');
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

router.put('/atualizarOs/:id',(request,response)=>{
    let aparelho = request.body.aparelho;
    let defeito = request.body.defeito;
    let servico = request.body.servico;
    let valor = request.body.valor;
    let statusId = request.body.status;
    let observacao = request.body.observacao;
    let autorizado = request.body.autorizado;
    let idCliente = request.body.idCliente;
    let id = request.params.id;

    OrdemServico.update({
        aparelho:aparelho,
        defeito:defeito,
        servico:servico,
        valor:valor,
        statusId:statusId,
        observacao:observacao,
        autorizado:autorizado,
        idCliente:idCliente
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
        recibo.text(`Serviço: ${servico}`);
        recibo.text(`Valor: R$ ${valor.toFixed(2)}`);
        recibo.text(`Observação: ${observacao}`);
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
        recibo.text("Assinatura do Cliente:  _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _", {
            align: 'left'
        });
        recibo.end();

        response.send('Ordem de Serviço Atualizada com Sucesso');
    }).catch((erro)=>{
        console.error(erro);
        response.send('Falha ao Atualizar esta O.S');
    });

})

module.exports = router;