var child_process = require('child_process')
child_process.exec('node -v', function(err, stdout, stderr) {
	console.log(stdout);
});

var child = child_process.spawn('ls.bat');
child.stdout.setEncoding('');
child.stdout.on('data', function(data) {
  console.log(data);
});