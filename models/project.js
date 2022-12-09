'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      // define association here
    }
  }
  Project.init(
    {
      projectName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      projectType: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING
      },
      materials: {
        type: DataTypes.ARRAY(DataTypes.JSON)
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING)
      },
      budget: {
        type: DataTypes.STRING
      },
      startDate: {
        type: DataTypes.DATE
      },
      endDate: {
        type: DataTypes.DATE
      },
      isPublic: {
        type: DataTypes.BOOLEAN,
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
      modelName: 'Project',
      tableName: 'projects'
    }
  )
  return Project
}
