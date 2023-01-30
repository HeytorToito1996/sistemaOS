const conexao = require('./Conexao');

const Status = conexao.sequelize.define('status',{
    nome:{
        type:conexao.Sequelize.STRING     
    }
});

module.exports = Status;