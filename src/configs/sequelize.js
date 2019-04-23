require('dotenv').config()

if (process.env.NODE_ENV !== 'production') {
  require('@babel/register')
}

const options = () => {
  const config = {}

  switch (process.env.NODE_ENV) {
    case 'production':
      config.database = process.env.DB_NAME
      config.logging = false
      break
    case 'development':
      config.database = process.env.DB_DEV
      config.logging = console.log
      break
    case 'test':
      config.database = process.env.DB_TEST
      config.logging = false
      break
  }

  return config
}

const baseDbSetting = {
  username: process.env.DB_USER,
  password: process.env.DB_PW,
  host: process.env.DB_HOST,
  database: options().database,
  logging: options().logging,
  timezone: '+09:00',
  dialect: 'mysql',
  pool: {
    max: 100,
    min: 0,
    idle: 10000
  },
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
    timestamps: true
  }
}

module.exports = baseDbSetting
