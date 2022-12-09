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
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      projectId: {
        type: DataTypes.INTEGER,
        allowNull: false
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
      modelName: 'User_Project',
      tableName: 'user_projects'
    }
  )
  return User_Project
}
