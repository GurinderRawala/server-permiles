const { DataTypes, Model } = require('sequelize')
class Broker extends Model {}
const createBrokerModel = (sequelize) => {
  Broker.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      clientid: {
        allowNull: false,
        references: {
          model: 'clients',
          key: 'id',
        },
        type: DataTypes.UUID,
      },
      name: {
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
      email: {
        allowNull: false,
        unique: true,
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
      modelName: 'broker',
      tableName: 'brokers',
    }
  )

  return Broker
}

module.exports = {
  Broker,
  createBrokerModel,
}
