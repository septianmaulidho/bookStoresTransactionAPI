const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')

app.get('/books', (req, res) => {
    const result = db.get('books', req.query)
    res.send(result)
})

module.exports = app