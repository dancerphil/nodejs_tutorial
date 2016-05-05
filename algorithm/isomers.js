// 同分异构体 大清乙烷
var should = require('should') // npm install
function getIsomers(n){
	if (n < 4) {
		return 1
	}

	return 0 // FIXME
}                   

getIsomers(1).should.equal(1) // 1
getIsomers(2).should.equal(1) // 11
getIsomers(3).should.equal(1) // 111
getIsomers(4).should.equal(2) // 1111	121
getIsomers(5).should.equal(3) // 11111	1211	131
getIsomers(6).should.equal(5) // 111111	12111	11211	1311	1221
getIsomers(10).should.equal(75)

console.log('pass')


