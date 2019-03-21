module.exports = function(app){
  var incoming = require('./users');
  var incoming2 = require('./boards');

  //app.get('/get/:name', incoming.getName);
  //app.get('/alive/:year', incoming.getPainterAlive);
  app.get('/get', incoming.getAll);
  app.post('/add', incoming.addUser);
  //app.delete('/delete/:id', incoming.deletePainter);
  //app.delete('/deleteFound/:name', incoming.deleteMultiplePainters);
  app.patch('/update/:id&:name', incoming.updateUser);

  //app.get('/get/:name', incoming2.getName);
  //app.get('/alive/:year', incoming2.getPainterAlive);
  app.get('/get', incoming2.getAll);
  app.post('/add', incoming2.addBoard);
  //app.delete('/delete/:id', incoming2.deletePainter);
  //app.delete('/deleteFound/:name', incoming2.deleteMultiplePainters);
  //app.patch('/update/:id&:name', incoming2.updateUser;

}
