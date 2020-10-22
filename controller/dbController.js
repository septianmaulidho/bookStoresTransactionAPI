const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const storesModel = require('../model/storesModel')
const categoryModel = require('../model/categoryModel')
const booksModel = require('../model/booksModel')
const transactionModel = require('../model/transactionModel')
const cashierModel = require('../model/cashierModel')

// ⚠️ propietary code, don't change it ⚠️
// this code will create db.json automatically if your folder doesn't have one
// courious? 👀 search for "IIFE function"
let db;
(async () => {
  try {
    const fs = require('fs')
    const util = require('util')
    const readdir = util.promisify(fs.readdir)
    const path = require('path').resolve()
    const dir = await readdir(path)
    if (!dir.includes('db.json'))
      fs.writeFile(path + 'db.json', '', () => 1)

    const adapter = new FileSync('db.json')
    db = low(adapter)
    // we will call each key in lowdb object as "table"
    db.defaults({
      // 👇 table names
      stores: [],
      category: [],
      books: [],
      transaction: [],
      cashier: []
    })
      .write()
  } catch (error) {
    console.log(error);
  }
})()


/**
 * Get data
 * @param {String} tableName table name
 * @returns {Object} data
 */

function validator(body, model) {
  let result = {}
  let modelCounter = model.length
  let counter = 0
  for (const key in body) {
    if (model.includes(key)) {
      result[key] = body[key]
      counter++
    }
  }
  if (counter < modelCounter) {
    return false
  }
  return result
}

function validatorforEdit(body, model) {
  let result = {}
  for (const key in body) {
    if (model.includes(key)) {
      result[key] = body[key]
    }
  }
  if (Object.keys(result).length == 0) {
    return false
  }
  return result
}

function get(tableName, query) {
  if (query && Object.keys(query).length) {
    return db
      .get(tableName)
      .find(query)
      .value()
  }
  return db
    .get(tableName)
    .value()
}

function getById(tableName, id) {
  return db.get(tableName)
    .find({ id })
    .value()
}

/**
 * Add data
 * @param {String} tableName table name
 * @param {Object} body inserted data
 */
function add(tableName, body) {
  let parsedBody
  if (tableName == 'stores') {
    parsedBody = validator(body, storesModel)
  }
  if (tableName == 'category') {
    parsedBody = validator(body, categoryModel)
  }
  if (tableName == 'books') {
    parsedBody = validator(body, booksModel)
  }
  if (tableName == 'transaction') {
    parsedBody = validator(body, transactionModel)
  }
  if (tableName == 'cashier') {
    parsedBody = validator(body, cashierModel)
  }
  if (!parsedBody) {
    return false
  }
  return db.get(tableName)
    .push(parsedBody)
    .write()
}

/**
 * Add a data
 * @param {String} tableName table name
 * @param {String|Number} id data id
 * @param {Object} body updated data
 */
function edit(tableName, id, body) {
  let parsedBody
  if (tableName == 'stores') {
    parsedBody = validatorforEdit(body, storesModel)
  }
  if (tableName == 'category') {
    parsedBody = validatorforEdit(body, categoryModel)
  }
  if (tableName == 'books') {
    parsedBody = validatorforEdit(body, booksModel)
  }
  if (tableName == 'transaction') {
    parsedBody = validatorforEdit(body, transactionModel)
  }
  if (parsedBody == false) {
    return false
  }
  return db.get(tableName)
    .find({ id })
    .assign(body)
    .write()
}

/**
 * Remove a data
 * @param {String} tableName table name
 * @param {String|Number} id data id
 */
function remove(tableName, id) {
  db.get(tableName)
    .remove({ id })
    .write()
}

module.exports = {
  get,
  getById,
  add,
  edit,
  remove
}