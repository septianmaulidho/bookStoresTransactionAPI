const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')
const authentication = require('../../middleware/authorizationMiddleware')

app.use(authentication)
app.delete('/transaction', (req, res) => {
    const query = req.query
    const found = db.get('transaction', query)
    if (found) {
        db.remove('transaction', found.id)
        res.send('Ok')
    } else {
        res.status(404).send(`The ID isn't available in database!`)
    }
})

module.exports = app