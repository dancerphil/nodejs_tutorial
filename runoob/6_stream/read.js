var fs = require("fs")
var out = ''
var count = 0
var readerStream = fs.createReadStream('data.txt')
readerStream.setEncoding('UTF8')

readerStream.on('data', function(data) {
	console.log('dataEmitter.'+count++)
	out += data
})

readerStream.on('end', function() {
	console.log('readEnd.')
	console.log('1024k / 16 = ' + 1024/16 +'k')
	console.log('注意 done. 在最开始')
	// console.log(out)
})

readerStream.on('finish', function() {
	console.log('readFinish.')
	// console.log(out)
})

readerStream.on('error', function(err) {
	console.log('readError.')
	console.log(err.stack)
})

console.log("done.")