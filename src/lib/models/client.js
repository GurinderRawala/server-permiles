const { DataTypes, Model } = require('sequelize')
// const { UserAccount } = require('./user-accounts')

class Client extends Model {}

const createClientAccountModel = (sequelize) => {
  Client.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      legalname: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      streetaddress: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      city: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      postalcode: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      province: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      country: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      isActive: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      contactname: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      startdate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      createdAt: {
        allowNull: false,
        field: 'createdat',
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        field: 'updatedat',
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'client',
      tableName: 'clients',
    }
  )

  // Client.hasMany(UserAccount)
  return Client
}

module.exports = {
  Client,
  createClientAccountModel,
}
