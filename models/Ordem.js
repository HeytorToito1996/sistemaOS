const conexao = require('./Conexao');
const Cliente = require('./Cliente');
const Status = require('./Status');
const Autorizacao = require('./Autorizacao');


const OrdemServico = conexao.sequelize.define('ordemServico',{
    aparelho :{
        type:conexao.Sequelize.STRING
    },

    defeito :{
        type:conexao.Sequelize.STRING
    },

    servico :{
        type:conexao.Sequelize.STRING
    },

    valor :{
        type:conexao.Sequelize.DOUBLE
    },

    statusId:{
        type: conexao.Sequelize.INTEGER,
        defaultValue: true,
        allowNull: false
    },

    autorizado:{
        type: conexao.Sequelize.INTEGER,
        defaultValue: true,
        allowNull: false
    },

    idCliente:{
        type:conexao.Sequelize.INTEGER,
    }
});

module.exports = OrdemServico;

