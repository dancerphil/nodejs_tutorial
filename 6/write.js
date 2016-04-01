var fs = require("fs")
var data = '一些数据'

var writerStream = fs.createWriteStream('o.txt')

writerStream.write(data,'UTF8')
writerStream.write(data,'UTF8')

writerStream.end()

writerStream.on('finish', function() {
    console.log("writeFinish.")
})

writerStream.on('error', function(err){
   console.log(err.stack)
})

console.log("done.")
