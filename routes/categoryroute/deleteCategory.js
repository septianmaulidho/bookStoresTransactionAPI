const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')

app.delete('/category', (req, res) => {
    const query = req.query
    const id = query.id

    if (db.get('category', id)) {
        db.remove('category', id)
        res.send('Ok')
    } else {
        res.status(404).send(`The ID isn't available in database!`)
    }
})

module.exports = app