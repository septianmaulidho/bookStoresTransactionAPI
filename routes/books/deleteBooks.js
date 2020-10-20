const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')

app.delete('/books', (req, res) => {
    const query = req.query
    const found = db.get('books', query)
    if (found) {
        db.remove('books', found.id)
        res.send('Ok')
        UpdateCategoryQty(found.categoryId)
    } else {
        res.status(404).send(`The ID isn't available in database!`)
    }
})

function UpdateCategoryQty(catId) {
    const data = db.get('books')
    let total = 0
    for (let i = 0; i < data.length; i++) {
        if (data[i].categoryId == catId) {
            total += parseInt(data[i].qty)
        }
    }
    const body = { Qty: `${total}` }
    db.edit('category', catId, body)
}

module.exports = app