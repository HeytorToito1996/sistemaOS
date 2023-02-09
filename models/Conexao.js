const Sequelize = require ('sequelize');
const sequelize = new Sequelize('heroku_4fe5a8614a48410','b02bcf1fd64117','dde2e982',{
    host:"us-cdbr-east-06.cleardb.net",
    dialect:"mysql"
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}
