const cheerio = require('cheerio')
const urls = require('../urls')
const util = require('./util')

const getAttr = util.getAttr
const getText = util.getText
const toNum = util.toNum

module.exports = {
    parseQuestions
}

/**
 * Parse latest questions list.
 *
 * The page url has the following format:
 * https://www.zhihu.com/log/questions
 */
function parseQuestions(html) {
    var $ = cheerio.load(html)
    var items = $('div.zm-item')

    var questions = []

    for (var i = 0; i < items.length; i++) {
        var item = $(items[i])
        var titleEle = $('.zm-item-title a', item)
        var authorEle = $('h2 + div > a', item)
        var timeEle = $('div.zm-item-meta time', item)

        var link = getAttr(authorEle, 'href')
        var id = getAttr(titleEle, 'href')

        var question = {
            logid: toNum(getAttr(item, 'id').replace('logitem-', '')),
            title: getText(titleEle),
            link: urls.full(id),
            id: toNum(id.substring('/question/'.length)),
            author: {
                name: getText(authorEle),
                uname: link.substring('/people/'.length),
                link: urls.full(link)
            },
            time: +new Date(getText(timeEle)),
            crawltime: Date.now()
        }

        questions.push(question)
    }

    return questions
}
