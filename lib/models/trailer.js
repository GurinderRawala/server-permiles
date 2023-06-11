const { DataTypes, Model, TEXT  } = require('sequelize');

class Trailer extends Model {}

const createTrailerModel = (sequelize) => { 
    Trailer.init({
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
        trailerAttributes:{
            allowNull: false,
            type: DataTypes.TEXT,
            field: 'trailerattributes'
        },
        model:{
            allowNull: false,
            type: DataTypes.STRING
        },
        make:{
            allowNull: false,
            type: DataTypes.STRING
        },
        year:{
            allowNull: false,
            type: DataTypes.STRING
        },
        trailerNo:{
            allowNull: false,
            type: DataTypes.STRING,
            field: 'trailerNo'
        },
        vinNumber:{
            allowNull: true,
            type: DataTypes.STRING,
            field: 'vinNumber'
        },
        licencePlate:{
            allowNull: false,
            type: DataTypes.STRING,
            field: 'licencePlate'
        },
        licenceState:{
            allowNull: false,
            type: DataTypes.STRING,
            field: 'licenceState'
        },
        safetyExpire:{
            allowNull: false,
            type: DataTypes.DATEONLY,
            field: 'safetyExpire'
        },
        filepath : {
            defaultValue: null,
            type: DataTypes.ARRAY(TEXT)
        },
        notes:{
            defaultValue: null,
            type: DataTypes.TEXT
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
        modelName: 'trailer',
        tableName: "trailers",
    });
    return Trailer
}

module.exports = {
    Trailer,
    createTrailerModel
}