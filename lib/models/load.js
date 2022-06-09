const { DataTypes, Model, TEXT } = require('sequelize');
class Load extends Model {}

const createLoadModel = (sequelize) =>{
    Load.init({
        id:{
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID
        },
        clientid: {
            allowNull: false,
            references: {
                model: 'clients',
                key: 'id',
            },
            type: DataTypes.UUID
        },
        assignedTo:{
            allowNull: true,
            references: {
                model: 'drivers',
                key: 'id'
            },
            type: DataTypes.UUID,
            field: 'assignedto'
        },
        tripId:{
            allowNull: true,
            references:{
                model: 'trips',
                key: 'id'
            },
            type: DataTypes.UUID,
            field: 'tripid'
        },
        brokerId:{
            allowNull: false,
            references:{
                model: 'brokers',
                key: 'id'
            },
            type: DataTypes.UUID,
            field: 'brokerid'
        },
        loadId:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            field: 'loadid'
        },
        state:{
            allowNull: false,
            type: DataTypes.ENUM("CREATED", "ASSIGNED", "ACCEPTED", "REJECTED", "DELIVERED"),
            defaultValue: "CREATED"
        },
        shipper: {
            allowNull: false,
            type: DataTypes.ARRAY(TEXT)
        },
        receiver: {
            allowNull: false,
            type: DataTypes.ARRAY(TEXT)
        },
        poNumber: {
            allowNull: false,
            type: DataTypes.STRING,
            field: 'ponumber'
        },
        trailerNo: {
            allowNull: true,
            type: DataTypes.STRING,
            field: 'trailerno'
        },
        commodity : {
            allowNull: true,
            type: DataTypes.STRING
        },
        hazmat: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        totalWeight:{
            allowNull: true,
            type: DataTypes.STRING,
            field: 'totalweight'
        },
        filepath: {
            allowNull: true,
            type: DataTypes.ARRAY(TEXT)
        },
        specialInstructions:{
            allowNull: true,
            type: DataTypes.TEXT,
            field: 'specialinstructions'
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
        modelName: 'load',
        tableName: "loads",
    });
    
    return Load
}

module.exports = {
    Load,
    createLoadModel
}