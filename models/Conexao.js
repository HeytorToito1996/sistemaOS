const Sequelize = require ('sequelize');
const sequelize = new Sequelize('sistemaos1','root','',{
    host:"localhost",
    dialect:"mysql"
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}
