const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')

app.post('/stores', (req, res) => {
    const body = req.body
    if (db.get('stores', body.id)) {
        res.status(404).send("Bad Request!")
    } else {
        res.send(db.add('stores', body))
    }
})

module.exports = app