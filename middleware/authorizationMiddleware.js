const hyperId = require('hyperid')

function authorization(req, res, next) {
  const authorization = req.headers.authorization
  const token = authorization.split(' ')[1]
  const isValidToken = hyperId.decode(token)
  if (isValidToken) {
    next()
  } else {
    res.status(401).send('Unauthorized')
  }
}

module.exports = authorization