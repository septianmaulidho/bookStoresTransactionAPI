const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')

app.post('/category', (req, res) => {
    const body = req.body
    if (db.get('category', body.id) && db.get('stores', body.storeId)) {
        res.status(404).send("Bad Request!")
    } else {
        res.send(db.add('category', body))
    }
})

module.exports = app