var redis = require("redis")
  , client = redis.createClient();

client.hkeys('*',function(err, replies){
	console.log(replies)
	replies.forEach(function (reply, i) {
		client.del('*', reply, redis.print)
	});
})






