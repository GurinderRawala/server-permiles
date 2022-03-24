
const { DataTypes, Model } = require('sequelize');

module.exports.createDriverModel = (sequelize) => {
  class Driver extends Model {}

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
  }
}, {
  sequelize, 
  modelName: 'driver',
  tableName: "drivers",
});
  return Driver
}


