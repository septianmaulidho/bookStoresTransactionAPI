const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')
const authentication = require('../../middleware/authorizationMiddleware')

app.use(authentication)
app.post('/transaction', (req, res) => {
    const body = req.body
    if (!db.getById('stores', body.storeId)) {
        res.send(404).send("Store is not exist")
        return
    }
    if (db.getById('transaction', body.id)) {
        res.status(400).send("Transaction Id has already Exist")
        return
    }
    const result = db.add('transaction', body)
    if (!result) {
        res.status(400).send('Wrong body')
    } else {
        res.send(result)
    }
})

module.exports = app