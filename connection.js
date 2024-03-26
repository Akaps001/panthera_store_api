const{Sequelize} = require('sequelize');
const sequelize = new Sequelize('pantherastoredb','root','Obikayode',{
    host:"localhost",
    dialect:'mysql'

})
module.exports = sequelize