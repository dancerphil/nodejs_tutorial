var io = require('socket.io')()

io.listen(80)
io.sockets.use(function(socket, next) {
	console.log("in use")
	next()
})
.on('connection', function (socket) {
	console.log("in con")
	socket.on('fff', function (data) {
    	console.log(data);
	})
})
console.log('The bus socket service listen on port ' + 80);