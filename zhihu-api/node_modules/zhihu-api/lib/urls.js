const querystring = require('querystring')

const baseurl = 'https://www.zhihu.com'

function id(val) {
    return function() {
        return val
    }
}

exports = module.exports = {}

exports._baseurl = baseurl
exports.index = id(baseurl)

exports.full = function(path) {
    return baseurl + path
}

exports.user = {
    home: function(uname) {
        return baseurl + '/people/' + uname
    },
    detail: function(uname) {
        return baseurl + '/people/' + uname + '/about'
    },
    profile: function(uname) {
        var profileUrl = baseurl + '/node/MemberProfileCardV2'
        var params = querystring.stringify({
            params: JSON.stringify({
                'url_token': uname
            })
        })
        return profileUrl + '?' + params
    },
    followers: id(baseurl + '/node/ProfileFollowersListV2'),
    followees: id(baseurl + '/node/ProfileFolloweesListV2'),
    answers: function(uname, page) {
        return baseurl + '/people/' + uname + '/answers?page=' + (page || 1)
    },
    collections: function(uname, page) {
        return baseurl + '/people/' + uname + '/collections?page=' + (page || 1)
    },
    columns: function(uname) {
        return baseurl + '/people/' + uname + '/posts'
    },
    topics: function(uname) {
        return baseurl + '/people/' + uname + '/topics'
    },
    followedColumns: id(baseurl + '/node/ProfileFollowedColumnsListV2')
}

exports.question = {
    latest: id(baseurl + '/log/questions'),
    answersByVote: id(baseurl + '/node/QuestionAnswerListV2'),
    answersByPage: function(questionId, page) {
        var params = querystring.stringify({
            sort: 'created',
            page: page || 1
        })
        return baseurl + '/question/' + questionId + '?' + params
    }
}

exports.action = {
    follow: id(baseurl + '/node/MemberFollowBaseV2'),
    sendMessage: id(baseurl + '/inbox/post'),
    voteAnswer: id(baseurl + '/node/AnswerVoteBarV2'),
    followTopic: id(baseurl + '/node/TopicFollowBaseV2')
}

exports.topic = {
    organize: function(id) {
        return baseurl + '/topic/' + id + '/organize'
    },
    followers: function(id) {
        return baseurl + '/topic/' + id + '/followers'
    },
    topAnswers: function(id, page) {
        return baseurl + '/topic/' + id + '/top-answers?page=' + (page || 1)
    },
    hotAnswers: function(id) {
        return baseurl + '/topic/' + id + '/hot'
    },
    newAnswers: function(id) {
        return baseurl + '/topic/' + id + '/newest'
    },
    pendingQuestions: function(id, page) {
        return baseurl + '/topic/' + id + '/questions?page=' + (page || 1)
    },
    hotPendingQuestions: function(id, page) {
        return baseurl + '/topic/' + id + '/unanswered?page=' + (page || 1)
    }
}
