var mongoose = require('mongoose');

Schema = mongoose.Schema;

var BoardSchema = new Schema({
  board: String,
  diff: Number
});

mongoose.model('Board', BoardSchema);
