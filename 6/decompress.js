var fs = require("fs")
var zlib = require('zlib')

fs.createReadStream('data.txt.rar')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('Decompressed.txt'))
  
console.log("Decompressed.")
