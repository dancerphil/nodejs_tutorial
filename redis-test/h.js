var redis = require("redis")
  , client = redis.createClient();

client.keys('*',function(err, ks){
	console.log(ks)
	ks.forEach(function (k, i) {
		console.log(k)
		client.hkeys('socket',function(err, replies){
			replies.forEach(function (reply, i) {
				client.hdel('socket', reply, redis.print)
			});
		})
	})

})





