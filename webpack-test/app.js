var express = require('express');
var app = express();
app.use('/js', express.static('./client/dist'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/index.html');
});
app.listen(3000,function(){
	console.log('server start at 127.0.0.1:%s',this.address().port)
});