const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')

app.delete('/stores', (req, res) => {
    const query = req.query
    const id = query.id

    if (db.get('stores', id)) {
        db.remove('stores', id)
        res.send('Ok')
    } else {
        res.status(404).send(`The ID isn't available in database!`)
    }
})

module.exports = app