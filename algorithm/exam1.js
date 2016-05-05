// 笔试题 1

// // failed
// function shiftRight(arr,k){
// 	var l = arr.length
// 	for(var left=0,right=k;right!=k-2;left=(left+1)%k,right=(right+1)%l){
// 		var t = arr[left]
// 		arr[left] = arr[right]
// 		arr[right] = t
// 	}
// }

function shiftRight(str,k){
	k %= str.length
	var left = str.slice(0, k)
	var right = str.slice(k)
	return right .concat( left)
}

var should = require('should') // npm install

// ------ normal test
shiftRight('123456789', 0).should.equal('123456789')
shiftRight('123456789', 1).should.equal('234567891')
shiftRight('123456789', 2).should.equal('345678912')
shiftRight('123456789', 3).should.equal('456789123')
shiftRight('123456789', 7).should.equal('891234567')


shiftRight([1,2,3,4,5,6,7,8,9], 0).should.deepEqual([1,2,3,4,5,6,7,8,9])
shiftRight([1,2,3,4,5,6,7,8,9], 1).should.deepEqual([2,3,4,5,6,7,8,9,1])
shiftRight([1,2,3,4,5,6,7,8,9], 2).should.deepEqual([3,4,5,6,7,8,9,1,2])
shiftRight([1,2,3,4,5,6,7,8,9], 3).should.deepEqual([4,5,6,7,8,9,1,2,3])
shiftRight([1,2,3,4,5,6,7,8,9], 7).should.deepEqual([8,9,1,2,3,4,5,6,7])

// ------ shift left test
shiftRight('123456789', -2).should.equal('891234567')
shiftRight('123456789', -6).should.equal('456789123')

shiftRight([1,2,3,4,5,6,7,8,9], -2).should.deepEqual([8,9,1,2,3,4,5,6,7])
shiftRight([1,2,3,4,5,6,7,8,9], -6).should.deepEqual([4,5,6,7,8,9,1,2,3])

// ------ out of range test
shiftRight('123456789', 9).should.equal('123456789')
shiftRight('123456789', 10).should.equal('234567891')
shiftRight('123456789', 20).should.equal('345678912')
shiftRight('123456789', 10000).should.equal('234567891')
shiftRight('123456789', -10000).should.equal('912345678')

shiftRight([1,2,3,4,5,6,7,8,9], 9).should.deepEqual([1,2,3,4,5,6,7,8,9])
shiftRight([1,2,3,4,5,6,7,8,9], 10).should.deepEqual([2,3,4,5,6,7,8,9,1])
shiftRight([1,2,3,4,5,6,7,8,9], 20).should.deepEqual([3,4,5,6,7,8,9,1,2])
shiftRight([1,2,3,4,5,6,7,8,9], 10000).should.deepEqual([2,3,4,5,6,7,8,9,1])
shiftRight([1,2,3,4,5,6,7,8,9], -10000).should.deepEqual([9,1,2,3,4,5,6,7,8])

console.log('pass')