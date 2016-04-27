var Datastore = require('nedb')
  , db = new Datastore({ filename: 'data/tokens.db' });
db.loadDatabase(function (err) {    // Callback is optional
  // Now commands will be executed
});
var ss
function* foo(){
	var s = []
	s.push( yield getBusSocketData(1))
	s.push( yield getBusSocketData(2))
	s.push( yield getBusSocketData(3))
	ss=s
}
var f = foo()
function getBusSocketData(name){

	db.findOne({name: name}, function (err, docs) {
		f.next(docs);
	})
}

f.next()
