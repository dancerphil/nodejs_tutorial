
Promise.resolve('a').then((value) => {
	var fetchList = []
	fetchList.push(Promise.resolve(value))
	for(var i = 0; i < 100; i+=20){
		fetchList.push(Promise.resolve('b1: ' + i + ' -> ')
			.then((value)=>{
				return Promise.resolve(value + 'b2: ' + i + '\n')
			}))
	}
	return Promise.all(fetchList)
}).then((values) => {
	// console.log(values)
	require('fs').writeFile('test.txt',values+'c')
}).catch(function(reason) {
		console.log('--------failed--------')
		console.log(reason)
		console.log('----------------------')
	});