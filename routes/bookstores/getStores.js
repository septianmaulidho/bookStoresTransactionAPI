const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')

app.get('/stores', (req, res) => {
    const result = db.get('stores', req.query)
    if (result != undefined) {
        res.send(result)
    } else {
        res.status(404).send("Bad Request!")
    }
})

module.exports = app