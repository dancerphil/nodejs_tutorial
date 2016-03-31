const request = require('../request')
const parser = require('../parser')
const urls = require('../urls')

exports = module.exports = Question

function Question(_question) {
    if (!(this instanceof Question)) {
        return new Question(_question)
    }

    if (typeof _question === 'object') {
        this._question = _question
    } else {
        this._question = {
            id: _question
        }
    }
}

var proto = Question.prototype

Question.latest = function() {
    return Question.list(null, 0)
}

Question.list = function(start, offset) {
    return request.xsrf()
        .then(_xsrf => start ? ({
            start, offset, _xsrf
        }) : ({
            offset, _xsrf
        }))
        .then(data => request(urls.question.latest(), data))
        .then(data => {
            data = JSON.parse(data)
            return parser.parseQuestions(data.msg[1])
        })
}

proto.answers = function() {
    var self = this

    return {
        byVote: listAnswersbyVote.bind(self),
        byPage: listAnswersbyPage.bind(self)
    }
}

function listAnswersbyVote(offset) {
    var questionId = this._question.id

    return request.xsrf()
        .then(_xsrf => ({
            method: 'next',
            params: JSON.stringify({
                url_token: questionId,
                pagesize: 20,
                offset: offset || 0
            }),
            _xsrf
        }))
        .then(data => request(urls.question.answersByVote(), data))
        .then(data => {
            data = JSON.parse(data)
            return data.msg
        })
        .then(parser.parseAnswersByVote)
}

function listAnswersbyPage(page) {
    var questionId = this._question.id
    var url = urls.question.answersByPage(questionId, page)

    return request(url)
        .then(parser.parseAnswersByPage)
}
