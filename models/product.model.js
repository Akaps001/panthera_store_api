const {DataTypes} = require('sequelize');
const sequelize = require ('../connection');

const Product = sequelize.define(
    'product',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,  
         },
         name:{
            type:DataTypes.STRING,
            allNull:false,
         },
         price:{type:DataTypes.INTEGER,allNull:false},
         description:{
            type:DataTypes.STRING,
            allNull:true
         },
    },
    {}
);
module.exports = Product;