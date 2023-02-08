const conexao = require('./Conexao');

const Cliente = conexao.sequelize.define('Clientes',{
    nome :{
        type:conexao.Sequelize.STRING
    },

    endereco:{
        type:conexao.Sequelize.STRING
    },

    cpf:{
        type:conexao.Sequelize.STRING
    },

    telefone:{
        type:conexao.Sequelize.STRING
    },

    email:{
        type:conexao.Sequelize.STRING
    },
    
    observacao:{
        type:conexao.Sequelize.STRING
    }
});

//Cliente.sync({force:true});
module.exports = Cliente;
