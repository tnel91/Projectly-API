require('dotenv').config()
module.exports = {
  development: {
    database: 'project_planner_development',
    dialect: 'postgres'
  },
  test: {
    database: 'project_planner_test',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        require: true
      }
    }
  }
}
