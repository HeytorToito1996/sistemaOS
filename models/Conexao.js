const Sequelize = require ('sequelize');
const sequelize = new Sequelize('sistemaos1','root','',{
    host:"Localhost",
    dialect:"mysql"
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}
