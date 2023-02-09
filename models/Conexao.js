const Sequelize = require ('sequelize');
const sequelize = new Sequelize('heroku_f3069ce062c67bf','b922d910aa7302','3e090c44',{
    host:"us-cdbr-east-06.cleardb.net",
    dialect:"mysql"
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}
