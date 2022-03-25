
const { DataTypes, Model, STRING } = require('sequelize');

module.exports.createUserAccountModel = (sequelize) => {
  class User extends Model {}
  
  User.init({
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
  verify : {
    type: DataTypes.INTEGER
  },
  permissions: {
    defaultValue: [],
    type: DataTypes.ARRAY(STRING)
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
  modelName: 'userAccount',
  tableName: "userAccounts",
});

  return User
}


