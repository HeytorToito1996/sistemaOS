const Sequelize = require ('sequelize');
const sequelize = new Sequelize('osapp','root','',{
    host:"Localhost",
    dialect:"mysql"
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}
