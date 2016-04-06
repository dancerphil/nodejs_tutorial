var fs = require("fs"); // fs=file system

var data = fs.readFileSync('data.txt');

console.log(data.toString());
console.log("done.");