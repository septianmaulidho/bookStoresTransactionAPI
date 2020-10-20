const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')

app.post('/books', (req, res) => {
    const body = req.body
    if (!db.getById('category', body.categoryId)) {
        res.send(404).send("Category is not exist")
        return
    }
    if (db.getById('books', body.id)) {
        res.status(400).send("Book Id has already Exist")
        return
    }
    const result = db.add('books', body)
    if (!result) {
        res.status(400).send('Wrong body')
    } else {
        res.send(result)
        updateQtyCategory(body.categoryId, body.qty)
    }
    return
})

function updateQtyCategory(id, qty) {
    parseQty = parseInt(qty)
    oldQty = parseInt(db.getById('category', id).Qty)
    newQty = oldQty + parseQty
    const body = { Qty: `${newQty}` }
    db.edit('category', id, body)
}
module.exports = app