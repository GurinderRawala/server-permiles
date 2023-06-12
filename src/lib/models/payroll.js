const { DataTypes, Model, TEXT } = require('sequelize')
class Payroll extends Model {}

const createPayrollModel = (sequelize) => {
  Payroll.init(
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
      payrollTo: {
        allowNull: false,
        references: {
          model: 'drivers',
          key: 'id',
        },
        type: DataTypes.UUID,
        field: 'payrollto',
      },
      loadId: {
        allowNull: false,
        references: {
          model: 'loads',
          key: 'id',
        },
        type: DataTypes.UUID,
        field: 'loadid',
      },
      brokerId: {
        allowNull: true,
        references: {
          model: 'brokers',
          key: 'id',
        },
        type: DataTypes.UUID,
        field: 'brokerid',
      },
      shipper: {
        allowNull: false,
        type: DataTypes.ARRAY(TEXT),
      },
      receiver: {
        allowNull: false,
        type: DataTypes.ARRAY(TEXT),
      },
      poNumber: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'ponumber',
      },
      trailerNo: {
        allowNull: true,
        type: DataTypes.STRING,
        field: 'trailerno',
      },
      commodity: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      hazmat: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      totalWeight: {
        allowNull: true,
        type: DataTypes.STRING,
        field: 'totalweight',
      },
      filepath: {
        allowNull: true,
        type: DataTypes.ARRAY(TEXT),
      },
      totalMiles: {
        allowNull: true,
        type: DataTypes.FLOAT,
        field: 'totalmiles',
      },
      perMileRate: {
        allowNull: true,
        type: DataTypes.FLOAT,
        field: 'permilerate',
      },
      totalHours: {
        allowNull: true,
        type: DataTypes.FLOAT,
        field: 'totalhours',
      },
      perHourRate: {
        allowNull: true,
        type: DataTypes.FLOAT,
        field: 'perhourrate',
      },
      totalPay: {
        allowNull: true,
        type: DataTypes.FLOAT,
        field: 'totalpay',
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
      modelName: 'payroll',
      tableName: 'payrolls',
    }
  )

  return Payroll
}

module.exports = {
  Payroll,
  createPayrollModel,
}
