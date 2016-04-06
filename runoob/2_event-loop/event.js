// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();

// 绑定 connection 事件处理程序
eventEmitter.on('connect', function connected() {
   console.log('connected');
  
   // 触发 data_received 事件 
   eventEmitter.emit('receive');
});
 
// 使用匿名函数绑定 data_received 事件
eventEmitter.on('receive', function received(){
   console.log('received');
});

// 触发 connection 事件 
eventEmitter.emit('connect');

console.log("done.");