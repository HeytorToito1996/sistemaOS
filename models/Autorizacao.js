const conexao = require('./Conexao');

const Autorizacao = conexao.sequelize.define('Autorizacao',{
    nome:{
        type:conexao.Sequelize.STRING     
    }
});

//Autorizacao.sync({force:true});

module.exports = Autorizacao;

