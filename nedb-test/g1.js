
function* gen() {
  while(true) {
    var value = yield null;
    console.log(value);
  }
}

var g = gen();
g.next(1); 
g.next(2); 
g.next(3); 
g.next(4); 
g.next(5); 
g.next(6); 

// "{ value: null, done: false }"
// 2