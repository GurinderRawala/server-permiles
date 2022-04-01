
const { DataTypes, Model } = require('sequelize');

module.exports.createClientAccountModel = (sequelize) => {
    class Client extends Model {}
    Client.init({
        id:{
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        legalname: {
            allowNull: false,
            type: DataTypes.STRING
        },
        streetaddress: {
            allowNull: false,
            type: DataTypes.STRING
        },
        city: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        },
        postalcode : {
            allowNull: false,
            type: DataTypes.STRING
        },
        province : {
            allowNull: false,
            type: DataTypes.STRING
        },
        country : {
            allowNull: false,
            type: DataTypes.STRING
        },
        isActive : {
            allowNull: false,
            type: DataTypes.STRING
        },
        email : {
            allowNull: false,
            type: DataTypes.STRING
        },
        phone : {
            allowNull: false,
            type: DataTypes.STRING
        },
        contactname : {
            allowNull: false,
            type: DataTypes.STRING
        },
        startdate: {
            allowNull: false,
            type: DataTypes.DATE
        },
        createdAt:{
            allowNull:false,
            field: 'createdat',
            type:DataTypes.DATE
        },
        updatedAt:{
            allowNull: false,
            field: 'updatedat',
            type:DataTypes.DATE
        }
    }, {
        sequelize, 
        modelName: 'client',
        tableName: "clients",
    });
    return Client
}