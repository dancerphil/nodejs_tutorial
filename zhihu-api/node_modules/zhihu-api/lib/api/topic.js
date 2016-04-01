const request = require('../request')
const parser = require('../parser')
const urls = require('../urls')

exports = module.exports = Topic

function Topic(_topic) {
    if (!(this instanceof Topic)) {
        return new Topic(_topic)
    }

    if (typeof _topic === 'object') {
        this._topic = _topic
    } else {
        this._topic = {
            id: _topic
        }
    }
}

var proto = Topic.prototype

Topic.root = function() {
    return Topic(19776749).hierarchy()
}

proto.hierarchy = function() {
    var id = this._topic.id
    var url = urls.topic.organize(id)

    return request(url)
        .then(parser.parseTopicHierarchy)
}

proto.followers = function(start, offset) {
    var id = this._topic.id
    var url = urls.topic.followers(id)

    return request.xsrf()
        .then(_xsrf => ({
            offset: offset || 0,
            start: start || '',
            _xsrf
        }))
        .then(data => request(url, data))
        .then(data => {
            data = JSON.parse(data)
            return parser.parseTopicFollowers(data.msg[1])
        })
}

proto.topAnswers = function(page) {
    var id = this._topic.id
    var url = urls.topic.topAnswers(id, page)

    return request(url)
        .then(parser.parseTopicAnswers)
}

proto.hotAnswers = function(offset) {
    var id = this._topic.id
    var url = urls.topic.hotAnswers(id)

    return request.xsrf()
        .then(_xsrf => ({
            start: 0,
            offset: offset || '',
            _xsrf
        }))
        .then(data => request(url, data))
        .then(data => {
            data = JSON.parse(data)
            return parser.parseTopicAnswers(data.msg[1])
        })
}

proto.newAnswers = function(offset) {
    var id = this._topic.id
    var url = urls.topic.newAnswers(id)

    return request.xsrf()
        .then(_xsrf => ({
            start: 0,
            offset: offset || '',
            _xsrf
        }))
        .then(data => request(url, data))
        .then(data => {
            data = JSON.parse(data)
            return parser.parseTopicAnswers(data.msg[1])
        })
}

proto.pendingQuestions = function(page) {
    var id = this._topic.id
    var url = urls.topic.pendingQuestions(id, page)

    return request(url)
        .then(parser.parseTopicQuestions)
}

proto.hotPendingQuestions = function(page) {
    var id = this._topic.id
    var url = urls.topic.hotPendingQuestions(id, page)

    return request(url)
        .then(parser.parseTopicQuestions)
}
