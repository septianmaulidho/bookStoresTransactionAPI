const express = require('express')
const app = express.Router()
const db = require('../controller/dbController')
const hyperid = require('hyperid')

app.post('/login', (req, res) => {
  const result = db.get('cashier', req.body)
  if (result) {
    const instance = hyperid()
    result.token = instance()
    res.send(result)
  } else {
    res.status(401).send('Unauthorized')
  }
})

module.exports = app