const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')

app.patch('/books', (req, res) => {
    const body = req.body
    const query = req.query
    if (body.categoryId) {
        if (!db.getById('category', query.categoryId)) {
            res.status(404).send("Category Id is not exist!")
            return
        }
    }
    if (db.get('books', query)) {
        const edit = db.edit('books', db.get('books', query).id, body)
        if (edit == false) {
            res.status(404).send("Bad Request!")
            return
        }
        res.send(body)
        if (body.qty) {
            UpdateCategoryQty(db.get('books', query).categoryId)
        }

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