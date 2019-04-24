require('dotenv').config()

if (process.env.NODE_ENV !== 'production') {
  require('@babel/register')
}

const baseDbSetting = {
  username: process.env.DB_USER,
  password: process.env.DB_PW,
  host: process.env.DB_HOST,
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

// 이렇게 나누는 이유가 `$ sequelize db:migrate` 명령어를 입력할 때 key값을 알아서 찾아주는 듯
module.exports = {
  production: Object.assign(
    {
      database: process.env.DB_NAME,
      logging: false
    },
    baseDbSetting
  ),

  development: Object.assign(
    {
      database: process.env.DB_DEV,
      logging: true
    },
    baseDbSetting
  ),

  test: Object.assign(
    {
      database: process.env.DB_TEST,
      logging: false
    },
    baseDbSetting
  )
}
