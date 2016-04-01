const cheerio = require('cheerio')
const util = require('./util')
const urls = require('../urls')

const getAttr = util.getAttr
const getText = util.getText
const getData = util.getData
const toNum = util.toNum

module.exports = {
    parseAnswersByVote,
    parseAnswersByPage,
    parseUserAnswers,
    parseAnswer,
    _parseAnswer
}

function parseAnswersByVote(htmls) {
    return htmls.map(parseAnswer)
}

function parseAnswersByPage(html) {
    var answers = []
    var $ = cheerio.load(html)
    var items = $('#zh-question-answer-wrap .zm-item-answer')

    for (var i = 0; i < items.length; i++) {
        var answer = _parseAnswer($, $(items[i]))
        answers.push(answer)
    }

    return answers
}

function parseUserAnswers(html) {
    var answers = []
    var $ = cheerio.load(html)
    var items = $('#zh-profile-answer-list .zm-item-answer')

    for (var i = 0; i < items.length; i++) {
        var answer = _parseAnswer($, $(items[i]))
        answers.push(answer)
    }

    return answers
}

function parseAnswer(html) {
    var $ = cheerio.load(html)
    var item = $('.zm-item-answer')
    return _parseAnswer($, item)
}

function _parseAnswer($, item) {
    var agreesEle = $('.zm-item-vote-count', item)
    var authorEle = $('.zm-item-answer-author-info .author-link', item)
    var contentEle = $('.zm-item-rich-text', item)
    var answerEle = $('.zm-editable-content', contentEle)

    if (!answerEle.length) {
        var contentHtml = '<div id="custom-wrapper">' +
            $('textarea.content', contentEle).html() + '</div>'
        var $$ = cheerio.load(contentHtml)
        $$('.answer-date-link-wrap').remove()
        $$ = cheerio.load('<div id="custom-wrapper">' +
            $$('#custom-wrapper').text() + '</div>')
        answerEle = $$('#custom-wrapper')
    }

    var link = getAttr(authorEle, 'href')

    var answer = {
        id: getData(item, 'aid'),
        token: getData(item, 'atoken'),
        createdtime: toNum(getData(item, 'created')) * 1000,
        agrees: getData(agreesEle, 'votecount'),
        author: {
            name: getText(authorEle),
            uname: link.substring('/people/'.length),
            link: urls.full(link)
        },
        resourceid: getData(contentEle, 'resourceid'),
        link: urls.full(getData(contentEle, 'entry-url')),
        content: getText(answerEle).trim(),
        crawltime: Date.now()
    }

    return answer
}
