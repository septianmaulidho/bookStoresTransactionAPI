const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')

app.delete('/stores', (req, res) => {
    const query = req.query

    if (db.get('stores', query)) {
        db.remove('stores', query.id)
        res.send('Ok')
    } else {
        res.status(404).send(`The ID isn't available in database!`)
    }
})

module.exports = app