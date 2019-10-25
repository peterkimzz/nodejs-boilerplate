export default (req, res, next) => {
  const allowedOrigins = ['http://localhost:3001', 'http://localhost:3002']

  const origin = req.headers.origin

  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Credentials', true)
  }

  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type,X-Requested-With,x-access-token'
  )
  res.header('Access-Control-Allow-Credentials', true)

  next()
}
