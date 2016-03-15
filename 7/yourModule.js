function Foo() { 
	var name; 
	this.setName = function(_name) { 
		name = _name; 
	}; 
	this.sayHello = function() { 
		console.log('My name is ' + name + '.'); 
	}; 
}; 
module.exports = Foo;