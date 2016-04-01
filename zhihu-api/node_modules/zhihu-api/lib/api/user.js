const request = require('../request')
const parser = require('../parser')
const urls = require('../urls')

exports = module.exports = User

function User(_user) {
    if (!(this instanceof User)) {
        return new User(_user)
    }

    if (typeof _user === 'object') {
        this._user = _user
    } else {
        this._user = {
            uname: _user
        }
    }
}

var proto = User.prototype

proto.detail = function() {
    var uname = this._user.uname
    return request(urls.user.detail(uname))
        .then(parser.parseUserDetail)
}

proto.profile = function() {
    var uname = this._user.uname
    return request(urls.user.profile(uname))
        .then(parser.parseUserProfile)
}

proto.followers = function(offset) {
    return this._hash()
        .then(hash => listFollows('followers', hash, offset))
}

proto.followees = function(offset) {
    return this._hash()
        .then(hash => listFollows('followees', hash, offset))
}

proto.answers = function(page) {
    var uname = this._user.uname
    return request(urls.user.answers(uname, page))
        .then(parser.parseUserAnswers)
}

proto.collections = function(page) {
    var uname = this._user.uname
    return request(urls.user.collections(uname, page))
        .then(parser.parseUserCollections)
}

proto.columns = function() {
    var uname = this._user.uname
    return request(urls.user.columns(uname))
        .then(parser.parseUserColumns)
}

proto.topics = function(offset) {
    var uname = this._user.uname
    return request.xsrf()
        .then(_xsrf => ({
            start: 0,
            offset: offset || 0,
            _xsrf
        }))
        .then(data => request(urls.user.topics(uname), data))
        .then(data => {
            data = JSON.parse(data)
            return parser.parseUserTopics(data.msg[1])
        })
}

proto.latestActivity = function() {
    var uname = this._user.uname
    return request(urls.user.home(uname))
        .then(parser.parseUserActivity)
}

proto.followedColumns = function(offset) {
    var get_hash = this._hash()
    var get_xsrf = request.xsrf()

    return Promise.all([get_hash, get_xsrf])
        .then(arr => ({
            method: 'next',
            params: JSON.stringify({
                offset: offset || 0,
                limit: 20,
                hash_id: arr[0]
            }),
            _xsrf: arr[1]
        }))
        .then(data => request(urls.user.followedColumns(), data))
        .then(data => {
            data = JSON.parse(data)
            return parser.parseUserFollowedColumns(data.msg)
        })
}

proto._hash = function() {
    var hash = this._user.hash
    if (hash) {
        return Promise.resolve(hash)
    } else {
        return this.detail()
            .then(detail => {
                this._user.hash = detail.hash
                return detail.hash
            })
    }
}

function listFollows(follow, hash_id, offset) {
    var followUrl = {
        followers: urls.user.followers(),
        followees: urls.user.followees()
    }
    return request.xsrf()
        .then(_xsrf => ({
            method: 'next',
            params: JSON.stringify({
                order_by: 'created',
                offset: offset || 0,
                hash_id
            }),
            _xsrf
        }))
        .then(data => request(followUrl[follow], data))
        .then(data => {
            data = JSON.parse(data)
            return parser.parseUserFollows(data.msg)
        })
}
