import 'dotenv/config'

import createError from 'http-errors'
import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import router from './routes'

const app = express()

const HOST = process.env.HOST
const PORT = process.env.PORT

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(router)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  let apiError = err

  if (!err.status) {
    apiError = createError(err)
  }

  // set locals, only providing error in development
  res.locals.message = apiError.message
  res.locals.error = process.env.NODE_ENV === 'development' ? apiError : {}

  // render the error page
  return res.status(apiError.status).json({ message: apiError.message })
})

// open server
const server = app.listen(PORT, () => {
  console.log(`Server listening on https://${HOST}:${PORT}`)
})

// bin/www 를 그대로 사용하기 위해서 예외적으로 commonJs 문법을 적용
module.exports = app
