//有汉字
//如果有汉字和数字，数字长度7
var fs = require("fs")
fs.readFile('data.txt','utf8', (err, data) => {
  if (err) throw err;
  data.split('\r\n').forEach(foo);
});
var foo = function (item, index, array) {
	console.log(item);
	var re3 = /^[^]*[\u4e00-\u9fa5]+[^]*$/
	var re4 = /^[^]*[0-9]{7,}[^]*$/
	if(re3.test(item)&!re4.test(item)) {
		// console.log('\t'+item);
	}
	else{}
	var re5 = /^(?![^0-9]*([0-9]{7,}))[^]*[\u4e00-\u9fa5]+[^]*$/
	if(re5.test(item)) {
		console.log('\t\t'+item)
	}
	else{}
}