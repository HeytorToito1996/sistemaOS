const Sequelize = require ('sequelize');
const sequelize = new Sequelize('sistemaos1','root','b5d422bc762d2bd2b570e58d273ce62d',{
    host:"localhost",
    dialect:"mysql"
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}
