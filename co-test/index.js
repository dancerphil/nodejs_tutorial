var co = require('co');

function onerror(err) {
  console.error('err: '+err.stack);
}

co(function *(){
  // resolve multiple promises in parallel
  var a = Promise.resolve(1);
  var b = Promise.resolve(2);
  var c = Promise.resolve(3);
  var res = yield [a, b, c];
  console.log('1: '+res);
  // => [1, 2, 3]
}).catch(onerror);

co(function *(){
  try {
    yield Promise.reject(new Error('boom'));
  } catch (err) {
    console.error('2: '+err.message); // "boom"
 }
}).catch(onerror);

var fn = co.wrap(function* (val) {
  return yield Promise.resolve(val);
});

fn('some string : ').then(function (val) {
	console.log('3: '+val)
});

var fn = co.wrap(function* (val) {
  var a = Promise.resolve(val+'first');
  var b = Promise.resolve(val+'second');
  var c = Promise.resolve(val+'third');
  var res = yield [a, b, c];
  console.log('4: '+res);
  return res
});

fn('some string : ').then(function (val) {
	console.log('5: '+val)
});
