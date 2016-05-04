var a = JSON.stringify({hello : 'world'})
console.log(a)
var a = JSON.parse(a)
console.log(a)
var a = JSON.parse(`{"hello" : "world"}`) // 不能其他写法？坑爹
console.log(a)