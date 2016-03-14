var fs = require("fs");

var readerStream = fs.createReadStream('input.txt');

var writerStream = fs.createWriteStream('output.txt');

readerStream.pipe(writerStream);

readerStream.on('end', function() {
	console.log('readEnd')
	// console.log(out)
})

writerStream.on('finish', function() {
    console.log("writeFinish")
})

console.log("done.");