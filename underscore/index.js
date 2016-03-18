var _ = require('underscore')
var ori = [
	function () {
		console.log('yeah?')
	}
]
var foo = []
foo = _.clone(ori)
foo[0]()