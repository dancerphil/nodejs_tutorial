var io = require('socket.io')()
var Datastore = require('nedb')
  , db = new Datastore({ filename: 'data/tokens.db' });
db.loadDatabase();

io.listen(80)
io.use(function(socket, next) {
	console.log("in use")
	db.count({}, function (err, count) {
		console.log('db count: '+count)
		next()
	});
})
.on('connection', function (socket) {
	console.log("in con")
	socket.on('fff', function (data) {
		console.log("in fff")
		db.insert(data)
		console.log(data)
	})
})
console.log('The socket service listen on port ' + 80);