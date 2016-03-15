var fs = require("fs")
var zlib = require('zlib')

fs.createReadStream('data.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('data.txt.rar'))
  
console.log("Compressed.")
