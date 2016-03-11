var buf, buf1, buf2

buf = new Buffer([119, 119, 119, 46, 114, 117, 110, 111, 111, 98, 46, 99, 111, 109])
console.log('0.1: ' + buf.toString())

buf = new Buffer('www.runoob.com', 'utf-8')
console.log('1.1: ' + buf.toString())

buf = new Buffer(30)
len = buf.write('www.runoob.com')
console.log('2.1: ' + '写入字节数 : ' + len)
console.log('2.2: ' + buf.toString())
console.log('2.3: ' + buf.toString('utf-8', 0, len))

buf = new Buffer(10)
len = buf.write('www.runoob.com')
console.log('3.1: ' + '写入字节数 : ' + len)
console.log('3.2: ' + buf.toString())
console.log('3.3: ' + buf.toString('utf-8', 0, len))

buf = new Buffer(26)
buf.write('abcdefghijklmnopqrstuvwxyz')
console.log('4.1: ' + buf.toString('utf-8'))
console.log('4.2: ' + buf.toString('utf-8', 23, 26))

buf = new Buffer('www.runoob.com')
console.log('5.1: ')
console.log(buf.toJSON(buf))

buf = Buffer.concat([new Buffer('str1'), new Buffer(' '), new Buffer('str2')])
console.log("6.1: " + buf.toString())

buf1 = new Buffer('ABCDE')
buf2 = new Buffer('ABC')
console.log("7.1: " + buf1.compare(buf2))
console.log("7.2: " + buf1.compare(buf1))
console.log("7.3: " + buf2.compare(buf1))

buf1 = new Buffer('ABCD')
var len = buf1.length
buf2 = new Buffer("xxxxx"); buf1.copy(buf2, 0, 0, len); console.log("8.0: " + buf2.toString() + " （默认")
buf2 = new Buffer("xxxxx"); buf1.copy(buf2, 1); 		console.log("8.1: " + buf2.toString() + " （buf2起始位")
buf2 = new Buffer("xxxxx"); buf1.copy(buf2, 2); 		console.log("8.1: " + buf2.toString())
buf2 = new Buffer("xxxxx"); buf1.copy(buf2, 0, 1, len); console.log("8.2: " + buf2.toString() + " （部分复制")
buf2 = new Buffer("xxxxx"); buf1.copy(buf2, 0, 1, 3); 	console.log("8.2: " + buf2.toString())
buf2 = new Buffer("xxxxx"); buf1.copy(buf2, 1, 1, 3); 	console.log("8.2: " + buf2.toString())
buf2 = new Buffer("xxxxx"); buf1.copy(buf2, 2, 1, 3); 	console.log("8.2: " + buf2.toString())

buf1 = new Buffer('ABCD')
buf2 = buf1.slice(1, 3)
console.log("9.1: " + buf2.toString())