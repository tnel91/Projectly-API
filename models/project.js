'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      Project.belongsToMany(models.User, {
        as: 'collaborator',
        through: models.User_Project,
        foreignKey: 'project_id'
      })
      Project.belongsTo(models.User, {
        as: 'owner',
        foreignKey: 'user_id'
      })
      Project.hasMany(models.Checklist, {
        as: 'checklist',
        foreignKey: 'project_id'
      })
    }
  }
  Project.init(
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
      project_name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'New Project'
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: ''
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
      },
      image_file: {
        type: DataTypes.BLOB,
        allowNull: true,
        defaultValue: null
      },
      budget: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
      },
      start_date: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
      },
      end_date: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
      },
      is_public: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
      modelName: 'Project',
      tableName: 'projects',
      timestamps: false,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  )
  return Project
}
