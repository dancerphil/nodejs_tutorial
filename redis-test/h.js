var redis = require("redis")
  , client = redis.createClient();

// client.keys('*',function(err, ks){
// 	console.log(ks)
// 	ks.forEach(function (k, i) {
// 		console.log(k)
// 		client.hkeys('socket',function(err, replies){
// 			replies.forEach(function (reply, i) {
// 				client.hdel('socket', reply, redis.print)
// 			});
// 		})
// 	})

// })

// client.hset("test", 'keys maybe token2', 'JSON.stringify(item)2', redis.print);

// client.hkeys("test", function (err, replies) {
// 		if(err){
// 			console.log(err)
// 		} else {
// 			console.log(replies.length + " replies:");
// 			replies.forEach(function (reply, i) {
// 				client.hget("test", reply, function(a,b){
// 					console.log(a,b)
// 				})
// 			});
// 		}
// 	});

// client.hgetall("test", function (err, replies) {
// 	for(k in replies){
// 		console.log(k,replies[k])
// 	}
// })

client.hgetall("socket", function (err, replies) {
	for(k in replies){
		console.log(k)
		console.log('----')
		console.log(replies[k])
		console.log('------------')
	}
})

client.quit()