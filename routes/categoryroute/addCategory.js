const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')

app.post('/category', (req, res) => {
    const body = req.body
    if (!db.getById('stores', body.storeId)) {
        res.status(404).send("Store id is not exist!")
        return
    }
    const result = db.add('category', body)

    if (!result) {
        res.status(400).send('Wrong body')
    } else {
        res.send(result)
    }
})

module.exports = app