var fs = require("fs")
var resolveStream = fs.createWriteStream('resolve.txt')
var rejectStream = fs.createWriteStream('reject.txt')

fs.readFile('data.txt','utf8', (err, data) => {
  if (err) throw err;
  data.split('\r\n').forEach(foo);
});
var foo = function (item, index, array) {
	console.log(item);

	// 1、字符中存在汉字，2、字符中任何位置没有连续的7位数字
	var reg = /(?![^0-9]*([0-9]{7,}))[\u4e00-\u9fa5]+/
	if(reg.test(item)) {
		console.log('\t\t'+item)
		resolveStream.write(item+'\r\n','UTF8')
	}
	else{
		rejectStream.write(item+'\r\n','UTF8')
	}
}