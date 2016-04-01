const answer = require('./answer')
const question = require('./question')
const topic = require('./topic')
const user = require('./user')

var parser = Object.create(null)
Object.assign(parser, answer, question, topic, user)

module.exports = parser
