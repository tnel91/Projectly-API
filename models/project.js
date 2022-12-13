'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      Project.belongsToMany(models.User, {
        as: 'collaborator',
        through: models.User_Project,
        foreignKey: 'projectId'
      })
      Project.belongsTo(models.User, {
        as: 'owner',
        foreignKey: 'userId'
      })
      Project.hasMany(models.Checklist, {
        as: 'checklist',
        foreignKey: 'projectId'
      })
    }
  }
  Project.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      projectName: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'New Project'
      },
      tags: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
      },
      materials: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: { list: [] }
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: []
      },
      budget: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
      },
      startDate: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
      },
      endDate: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
      },
      isPublic: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
