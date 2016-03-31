const fs = require('fs')
const api = require('zhihu-api')
 
// cookie must be set before any request 
api.cookie(fs.readFileSync('./cookie'))
 
api.user('excited-vczh').detail()
    .then(console.log.bind(console))
    .catch(console.trace.bind(console))
