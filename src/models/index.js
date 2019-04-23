import fs from 'fs'
import path from 'path'

const Sequelize = require('sequelize')
const config = require(__dirname + '/../configs/sequelize.js')
const basename = path.basename(__filename)
const models = {}

// init
let sequelize
sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

// mapping
fs.readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-9) === '.model.js'
  )
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file))
    models[model.name] = model
  })

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models)
  }
})

models.sequelize = sequelize
models.Sequelize = Sequelize

// test for connection
sequelize
  .authenticate()
  .then(() => console.log('sequelize connection succeed'))
  .catch(err => console.log('sequelize connection failed', err))

export { models }
