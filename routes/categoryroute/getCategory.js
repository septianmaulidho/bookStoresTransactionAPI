const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')

app.get('/category', (req, res) => {
    const result = db.get('category', req.query)
    if (result != undefined) {
        res.send(result)
    } else {
        res.status(404).send("Bad Request!")
    }
})

module.exports = app