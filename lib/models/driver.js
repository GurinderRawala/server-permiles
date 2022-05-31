
const { DataTypes, Model, TEXT } = require('sequelize');

class Driver extends Model {}

const createDriverModel = (sequelize) => {
    Driver.init({
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
        phone: {
            allowNull: false,
            type: DataTypes.STRING
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING
        },
        password: {
            allowNull: false,
            type: DataTypes.TEXT
        },
        driver_id : {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        },
        drivers_licence : {
            allowNull: false,
            type: DataTypes.STRING
        },
        licence_state : {
            allowNull: false,
            type: DataTypes.STRING
        },
        truckno : {
            allowNull: false,
            type: DataTypes.STRING
        },
        clientid: {
            allowNull: false,
            references: {
                model: 'clients',
                key: 'id',
            },
            type: DataTypes.UUID
        },
        address: {
            allowNull: false,
            type: DataTypes.ARRAY(TEXT)
        },
        awaitingSignup : {
            defaultValue: true,
            allowNull: false,
            type: DataTypes.BOOLEAN
        },
        filepath : {
            defaultValue: null,
            type: DataTypes.ARRAY(TEXT)
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
        }
    }, {
        sequelize, 
        modelName: 'driver',
        tableName: "drivers",
    });
    return Driver
}

module.exports = {
    Driver,
    createDriverModel
}

