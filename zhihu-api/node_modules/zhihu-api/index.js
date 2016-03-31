const config = require('./lib/config')
const action = require('./lib/api/action')
const question = require('./lib/api/question')
const topic = require('./lib/api/topic')
const user = require('./lib/api/user')

function cookie(_cookie) {
    if (_cookie) {
        config.setCookie(_cookie)
    } else {
        return config.headers['Cookie']
    }
}

module.exports = {
    _config: config,
    cookie,
    action,
    question,
    topic,
    user
}
