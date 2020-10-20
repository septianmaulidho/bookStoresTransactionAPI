const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')

app.patch('/category', (req, res) => {
    const body = req.body
    const id = req.query.id
    if (db.get('category', id)) {
        const edit = db.edit('category', id, body)
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