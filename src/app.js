import 'dotenv/config'

import createError from 'http-errors'
import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import router from './routes'
import response from './utils/response'
import models from './models'

import corsMiddleware from './middlewares/cors.middleware'
import jwtMiddleware from './middlewares/jwt.middleware'

const app = express()
const HOST = process.env.HOST
const PORT = process.env.PORT
const COOKIE_SECRET = process.env.COOKIE_SECRET

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(COOKIE_SECRET))
app.use(corsMiddleware)
app.use(jwtMiddleware)
app.use(router)

app.use((req, res, next) => {
  next(createError(404))
})

app.use((err, req, res, next) => {
  let apiError = err

  if (!err.status) {
    apiError = createError(err)
  }

  // set locals, only providing error in development
  res.locals.message = apiError.message
  res.locals.error = process.env.NODE_ENV === 'development' ? apiError : {}

  // render the error page
  return response(
    res,
    {
      message: apiError.message
    },
    apiError.status
  )
})

models.sequelize
  .sync()
  .then(_ => console.log('\nDB Connetion Succeed\n'))
  .catch(err => console.log('\nDB Connetion Failed\n', err))

// open server
const server = app.listen(PORT, () => {
  console.log(`Server listening on https://${HOST}:${PORT}`)
})

module.exports = {
  app,
  server
}
