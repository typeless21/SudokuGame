const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: String,
  password: String,
  saved_game_id: {type: String, default: ""},
  saved_game: {type: String, default: ""},
  saved_time: {type: Number, default: 0},
  saved_diff: {type: Number, default: 4},
  HSEasy: {type: Number, default: 0},
  HSMedium: {type: Number, default: 0},
  HSHard: {type: Number, default: 0}
})

module.exports = mongoose.model('user', userSchema, 'users') // Can be used to create read data (model name, schemaused, collection in the db)
