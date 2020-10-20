const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')

app.patch('/stores', (req, res) => {
    const body = req.body
    const id = req.query.id
    if (db.get('stores', id)) {
        const edit = db.edit('stores', id, body)
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