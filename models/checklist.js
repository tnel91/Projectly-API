'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Checklist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Checklist.init(
    {
      projectId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      listItems: {
        type: DataTypes.ARRAY(DataTypes.JSON)
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date()
      }
    },
    {
      sequelize,
      modelName: 'Checklist',
      tableName: 'checklists'
    }
  )
  return Checklist
}
