const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')

app.get('/category', (req, res) => {
    res.send(db.get('category'))
})

module.exports = app