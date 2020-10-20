const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')

app.patch('/category', (req, res) => {
    const body = req.body
    const query = req.query
    if (body.storeId) {
        if (!db.getById('stores', body.storeId)) {
            res.status(404).send("Store Id is not exist!")
            return
        }
    }
    if (db.get('category', query)) {
        const edit = db.edit('category', query.id, body)
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