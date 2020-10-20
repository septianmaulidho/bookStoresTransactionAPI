const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')

app.patch('/stores', (req, res) => {
    const body = req.body
    const query = req.query
    if (db.get('stores', query)) {
        const edit = db.edit('stores', query.id, body)
        if (edit == false) {
            res.status(404).send("Bad Request!")
            return
        }
        res.send(edit)
    } else {
        res.status(404).send(`Wrong Query!`)
    }

})

module.exports = app