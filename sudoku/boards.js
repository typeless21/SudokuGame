//const fs = require('fs');
var mongoose = require('mongoose');
Board = mongoose.model('Board');
//var painters = [];

//painters = JSON.parse(fs.readFileSync('./painters.json', 'utf8'));  //metodei ar failiem

exports.getAll = function(req, res){
  Board.find({}, function(err, result){
    return res.send(result);
  });   //{} apzīmē visu

  //res.end(JSON.stringify(painters));  uz failu
};
/*
exports.getName = function(req, res){
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

/*
exports.getPainterAlive = function(req, res){
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

exports.addBoard = function(req, res){
  /*let painter = {
    name: req.body.name,
    birthy: req.body.birthy,
    deathy: req.body.deathy,
    style: req.body.style,
    notes: req.body.notes,
    leddit:1516720109
  };*/

  Board.create(req.body.board, function(err, result){ //pieviuenošana mongoose - create un mongodb - insert
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

/*
exports.updatePainter = function(req, res){
  let id = req.params.id;
  let newName = req.params.name; //'Henri Matisse'
  console.log(ular
  );
  Painter.findOneAndUpdate(
    {'id': id}, {$set: {'name' : newName}}, function(err, result){
      return res.send(result);
  });
};*/
