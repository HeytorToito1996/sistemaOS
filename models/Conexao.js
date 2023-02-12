const Sequelize = require ('sequelize');
const sequelize = new Sequelize('mysql','root','b5d422bc762d2bd2b570e58d273ce62d',{
    host:"mysql-wfkj:3306",
    dialect:"mysql"
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}
