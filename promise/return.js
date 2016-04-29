var fs = require('fs')

var outputPromise = new Promise((resolve)=>{
	fs.readFile('test.txt','utf8',function(err,data){
        if(!err && data) {
            resolve(data);
        }
    });
}).then(function(fulfilled){
    console.log(fulfilled);
},function(rejected){
    console.log(rejected);
});

//defer.reject();
// defer.resolve();