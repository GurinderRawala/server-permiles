const { DataTypes, Model, TEXT } = require('sequelize');
class Trip extends Model {}

const createTripModel = (sequelize) =>{
    Trip.init({
        id:{
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID
        },
        tripId:{
            allowNull: false,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            field: 'tripid'
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
            allowNull: false,
            references: {
                model: 'drivers',
                key: 'id'
            },
            type: DataTypes.UUID,
            field: 'assignedto'
        },
        tripInfo: {
            allowNull: false,
            type: DataTypes.ARRAY(TEXT),
            field: 'tripinfo'
        },
        bol:{
            allowNull: true,
            type: DataTypes.ARRAY(TEXT)
        },
        pod:{
            allowNull:true,
            type: DataTypes.ARRAY(TEXT)
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
        modelName: 'trip',
        tableName: "trips",
    });
    
    return Trip
}

module.exports = {
    Trip,
    createTripModel
}