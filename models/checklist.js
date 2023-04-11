'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Checklist extends Model {
    static associate(models) {
      Checklist.belongsTo(models.Project, {
        as: 'project',
        foreignKey: 'project_id'
      })
    }
  }
  Checklist.init(
    {
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'projects',
          key: 'id'
        }
      },
      order_index: {
        type: DataTypes.INTEGER
      },
      list_items: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: { items: [] }
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date()
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date()
      }
    },
    {
      sequelize,
      modelName: 'Checklist',
      tableName: 'checklists',
      timestamps: false,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  )
  return Checklist
}
