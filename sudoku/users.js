//const fs = require('fs');
var mongoose = require('mongoose');
User = mongoose.model('User');
//var painters = [];

//painters = JSON.parse(fs.readFileSync('./painters.json', 'utf8'));  //metodei ar failiem

exports.getAll = function(req, res){
  User.find({}, function(err, result){
    return res.send(result);
  });   //{} apzīmē visu

  //res.end(JSON.stringify(painters));  uz failu
};

/*exports.getName = function(req, res){
  let name = req.params.name; //'Henri Matisse'

  Painter.find({'name': {
    $regex: '.*' + name + '.*'  //ar regex jauzmanas
  }}, function(err, result){
    return res.send(result);
  });   //{} apzīmē visu

  /*let response = [];
  painters.forEach(painter => {
    if(painter.name.includes(name)){
      response.push(painter);
    }
  });
  res.end(JSON.stringify(response));*/
//};

/*exports.getPainterAlive = function(req, res){
  let year = req.params.year; //'Henri Matisse'

  Painter.find({
    'birthy': {
      $lte: year //less than or equal
    },
    'deathy': {
        $gte: year //greater than or equal
    }
  }, function(err, result){
    return res.send(result);
  });   //{} apzīmē visu
};*/

exports.addUser = function(req, res){
  /*let painter = {
    name: req.body.name,
    birthy: req.body.birthy,
    deathy: req.body.deathy,
    style: req.body.style,
    notes: req.body.notes,
    leddit:1516720109
  };*/

  User.create(req.body.user, function(err, result){ //pieviuenošana mongoose - create un mongodb - insert
    return res.send(result);
  });
  /*let painter = req.body.painter;
  painter['ledit'] = 1516720109;
  painters.push(painter);
  res.end(JSON.stringify(painters));*/
};

/*
exports.deletePainter = function(req, res){
  let id = req.params.id;
  Painter.findByIdAndRemove(id, function(err, result){
    return res.send(result);
  })
};*/

/*
exports.deleteMultiplePainters = function(req, res){
  let name = req.params.name; //'Henri Matisse'
  Painter.deleteMany({'name': {
    $regex: '.*' + name + '.*'  //ar regex jauzmanas
  }}, function(err, result){
    return res.send(result);
  });  //mongodb - remove un mongoose - deleteOne vai deleteMany
};*/

exports.updateUser = function(req, res){
  let username = req.params.username;
  let saved_game = req.params.saved_game;
  let saved_time = req.params.saved_time;
  let saved_diff = req.params.saved_diff;
  let highscore = req.params.highscore;
  console.log(ular
  );
  /*User.findOneAndUpdate(
    {'username': username}, {$set: {'saved_game' : saved_game}, {'saved_time' : saved_time}, {'saved_diff' : saved_diff}, {'highscore' : highscore}}, function(err, result){
      return res.send(result);
  });*/
};
