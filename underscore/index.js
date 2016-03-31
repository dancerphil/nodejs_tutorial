var _ = require('underscore')
var ori = [
	function () {
		console.log('yeah?')
	}
]
var foo = []
foo = _.clone(ori)
foo.splice(0,1)
if(!foo[0]){
	console.log('!exist')
}
ori[0]()
foo = _.clone(ori)
foo[0]()