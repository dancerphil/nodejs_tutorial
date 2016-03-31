const request = require('../request')
const urls = require('../urls')
const user = require('./user')

module.exports = {
    follow,
    unfollow,
    sendMessage,
    voteUp,
    voteDown,
    followTopic,
    unfollowTopic
}

function follow(uname) {
    return _follow('follow_member', uname)
}

function unfollow(uname) {
    return _follow('unfollow_member', uname)
}

function _follow(method, uname) {
    var get_hash = user(uname)._hash()
    var get_xsrf = request.xsrf()

    return Promise.all([get_hash, get_xsrf])
        .then(arr => ({
            method: method,
            params: JSON.stringify({
                hash_id: arr[0]
            }),
            _xsrf: arr[1]
        }))
        .then(data => request(urls.action.follow(), data))
        .then(data => JSON.parse(data))
}

function sendMessage(uname, msg) {
    var get_xsrf = request.xsrf()
    var get_hash = user(uname)._hash()

    return Promise.all([get_xsrf, get_hash])
        .then(arr => ({
            member_id: arr[1],
            content: msg,
            token: '',
            _xsrf: arr[0]
        }))
        .then(data => request(urls.action.sendMessage(), data))
        .then(data => JSON.parse(data))
}

function voteUp(id) {
    return _voteAnswer('vote_up', id)
}

function voteDown(id) {
    return _voteAnswer('vote_down', id)
}

function _voteAnswer(method, id) {
    return request.xsrf()
        .then(_xsrf => ({
            params: JSON.stringify({
                answer_id: '' + id
            }),
            method,
            _xsrf
        }))
        .then(data => request(urls.action.voteAnswer(), data))
        .then(data => JSON.parse(data))
}

function followTopic(tid) {
    return _followTopic('follow_topic', tid)
}

function unfollowTopic(tid) {
    return _followTopic('unfollow_topic', tid)
}

function _followTopic(method, tid) {
    return request.xsrf()
        .then(_xsrf => ({
            params: JSON.stringify({
                topic_id: '' + tid
            }),
            method,
            _xsrf
        }))
        .then(data => request(urls.action.followTopic(), data))
        .then(data => JSON.parse(data))
}
