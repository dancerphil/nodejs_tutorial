const fs = require('fs')
const api = require('zhihu-api')
 
api.cookie(fs.readFileSync('./cookie'))
 
var offset = 0
var idx = 0
 
function getFollowees(uname) {
    api.user(uname).followees(offset)
        .then(followees => {
            offset += followees.length
 
            fs.writeFile(++idx + '.json', JSON.stringify(followees), function(err) {
                if (err) {
                    console.log('write file', idx, 'error')
                } else {
                    console.log('write file', idx)
                }
            })
 
            if (followees.length) {
                setTimeout(function() {
                    getFollowees(uname)
                }, 1000)
            }
        })
}
 
getFollowees('excited-vczh')