var mongoose = require('mongoose');

Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  password: String,
  saved_game: {type: String, default: ""},
  saved_time: {type: Number, default: ""},
  saved_diff: {type: Number, default: ""},
  HSEasy: {type: Number, default: ""},
  HSMedium: {type: Number, default: ""},
  HSHard: {type: Number, default: ""}
});

mongoose.model('User', UserSchema);
