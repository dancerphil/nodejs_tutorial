var p = new Promise((resolve)=>{resolve(3)})
p.then((value)=>{console.log(value)})

var p = Promise.resolve('Hello');
p.then((s)=>{
  console.log(s)
});

function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(function foo(){
  		resolve(456)
  	}, ms);
  });
}

timeout(100).then((e) => {
  console.log('done'+e);
});
