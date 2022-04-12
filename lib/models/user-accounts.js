
const { DataTypes, Model } = require('sequelize');

class UserAccount extends Model {}

const createUserAccountModel = (sequelize) => {  
    UserAccount.init({
        id:{
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID
        },
        firstname: {
            allowNull: false,
            type: DataTypes.STRING
        },
        lastname: {
            allowNull: false,
            type: DataTypes.STRING
        },
        username: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        },
        password : {
            allowNull: false,
            type: DataTypes.STRING,
        },
        company : {
            allowNull: false,
            type: DataTypes.STRING
        },
        address : {
            type: DataTypes.STRING
        },
        active : {
            defaultValue: true,
            allowNull: false,
            type: DataTypes.BOOLEAN
        },
        awaitingSignup : {
            defaultValue: true,
            allowNull: false,
            type: DataTypes.BOOLEAN
        },
        role: {
            defaultValue: "user",
            type: DataTypes.STRING
        },
        filepath : {
            type: DataTypes.STRING
        },
        reg_date : {
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
        },
        clientId: {
            allowNull: false,
            references: {
                model: 'clients',
                key: 'id',
            },
            type: DataTypes.UUID
        },
        token: {
            allowNull: true,
            type: DataTypes.STRING
        }
    }, {
        sequelize, 
        modelName: 'userAccount',
        tableName: 'userAccounts',
    });
    
    return UserAccount
}

module.exports = {
    UserAccount,
    createUserAccountModel
}

