//event.js 文件
var events = require('events'); 
var emitter = new events.EventEmitter(); 
emitter.on('自定义事件', function(arg1, arg2) { 
	console.log('自定义事件触发了第一个监听器，并得到两个参数：', arg1, arg2); 
}); 
emitter.on('自定义事件', function(arg1, arg2) { 
	console.log('自定义事件触发了第二个监听器，并得到两个参数：', arg1, arg2); 
}); 
emitter.emit('自定义事件', 'arg1', 'arg2'); 