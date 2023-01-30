const conexao = require('./Conexao');

const Autorizacao = conexao.sequelize.define('Autorizacao',{
    nome:{
        type:conexao.Sequelize.STRING     
    }
});

module.exports = Autorizacao;

