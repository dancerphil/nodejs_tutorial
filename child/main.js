var child_process = require('child_process')
child_process.exec('node -v', function(err, stdout, stderr) {
	console.log(stdout);
});

var child = child_process.spawn('ls.bat');
child.stdout.setEncoding('');
child.stdout.on('data', function(data) {
  console.log(data);
});

var n = child_process.fork('./child.js');
n.on('message', function(m) {
  console.log('PARENT got message:', m);
});
n.send({ hello: 'world' });