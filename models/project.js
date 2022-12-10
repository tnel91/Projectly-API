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
        type: DataTypes.JSONB
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
