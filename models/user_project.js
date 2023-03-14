'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User_Project extends Model {
    static associate(models) {
      // define association here
    }
  }
  User_Project.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'projects',
          key: 'id'
        }
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
      modelName: 'User_Project',
      tableName: 'user_projects',
      timestamps: false,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  )
  return User_Project
}
