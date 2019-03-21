var express = require('express');
var app = express();
const fs = require('fs');
const bodyParser = require('body-parser');/////////////////
const hostname = '127.0.0.1';
const port = 8080;
mongoose = require('mongoose'); //var pateikt kādus laukus un lauka tipus izņemt no DB
mongoUrl = 'mongodb://localhost/sudoku';///////////////////////

mongoose.connect(mongoUrl);
var db = mongoose.connection;

require('./User');
require('./Board');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//////////////////////////////////////////////////////////////////////////
app.get('/', function(req, res) {
  res.sendFile(__dirname + "/addForm.htm");  //__dirname satur pilno ceļu, kur atrodas fails
})

require('./routes')(app);

var server = app.listen(port, hostname, function(){
  console.log(' Example server started: ' + hostname + ':' + port);
})
