const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')
const authentication = require('../../middleware/authorizationMiddleware')

app.use(authentication)
app.patch('/transaction', (req, res) => {
    const body = req.body
    const query = req.query
    if (body.storeId) {
        if (!db.getById('stores', body.storeId)) {
            res.status(404).send("Category Id is not exist!")
            return
        }
    }
    if (db.get('transaction', query)) {
        const edit = db.edit('transaction', db.get('transaction', query).id, body)
        if (edit == false) {
            res.status(404).send("Bad Request!")
            return
        }
        res.send(body)
    } else {
        res.status(404).send(`The ID isn't available in database!`)
    }

})

module.exports = app