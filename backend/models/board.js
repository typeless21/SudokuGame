const mongoose = require('mongoose')

const Schema = mongoose.Schema

const boardSchema = new Schema({
  board: String,
  diff: Number
})

module.exports = mongoose.model('board', boardSchema, 'boards') // Can be used to create read data (model name, schemaUsed, collection in the db)
