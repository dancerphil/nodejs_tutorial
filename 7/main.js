var myModule = require('./myModule')
myModule.foo()

var yourModule = require('./yourModule')
foo = new yourModule()
foo.setName('Chen Li')
foo.sayHello()

var foo =  require('./obj')
console.log(foo.str)