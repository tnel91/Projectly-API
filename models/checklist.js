'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Checklist extends Model {
    static associate(models) {
      Checklist.belongsTo(models.Project, {
        as: 'project',
        foreignKey: 'projectId'
      })
    }
  }
  Checklist.init(
    {
      projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'projects',
          key: 'id'
        }
      },
      listItems: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: { items: [] }
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
