module.exports = {
  development: {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "root",
    DB: "testdb",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "mysql",
    operatorsAliases: false
  }
};