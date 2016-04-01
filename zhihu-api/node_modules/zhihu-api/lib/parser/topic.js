const cheerio = require('cheerio')
const util = require('./util')
const urls = require('../urls')
const answerParser = require('./answer')

const getAttr = util.getAttr
const getText = util.getText
const getData = util.getData
const toNum = util.toNum

module.exports = {
    parseTopicHierarchy,
    parseTopicFollowers,
    parseTopicAnswers,
    parseTopicQuestions
}

/**
 * Parse the hierarchy of given topic.
 *
 * The page url has the following format:
 * https://www.zhihu.com/topic/${topicId}/organize
 * The root topic is:
 * https://www.zhihu.com/topic/19776749/organize
 */
function parseTopicHierarchy(html) {
    var $ = cheerio.load(html)

    var linkEle = $('.topic-avatar .zm-entry-head-avatar-link')
    var avatarEle = $('img', linkEle)
    var parentEles = $('#zh-topic-organize-parent-editor .zm-item-tag')
    var childEles = $('#zh-topic-organize-child-editor .zm-item-tag')
    var sidebarEle = $('#zh-topic-side-head')
    var focusEle = $('.zu-entry-focus-button', sidebarEle)
    var followerEle = $('.zm-topic-side-followers-info strong', sidebarEle)

    var link = getAttr(linkEle, 'href')
    var topic = {
        id: toNum(link.substring('/topic/'.length)),
        tid: toNum(getAttr(focusEle, 'id').substring('tf-'.length)),
        link: urls.full(link),
        name: getAttr(avatarEle, 'alt'),
        avatar: getAttr(avatarEle, 'src'),
        followers: toNum(getText(followerEle)),
        parents: _parseHierarchyLabels($, parentEles),
        children: _parseHierarchyLabels($, childEles),
        crawltime: Date.now()
    }

    return topic
}

function _parseHierarchyLabels($, eles) {
    if (!eles || !eles.length) {
        return []
    }

    var topics = []

    for (var i = 0; i < eles.length; i++) {
        var ele = $(eles[i])
        var link = getAttr(ele, 'href').replace('/organize', '')

        var topic = {
            id: getData(ele, 'token'),
            tid: getData(ele, 'topicid'),
            name: getText(ele).trim(),
            link: urls.full(link)
        }

        topics.push(topic)
    }

    return topics
}

/**
 * Parse followers of given topic.
 *
 * The page url has the following format:
 * https://www.zhihu.com/topic/${topicId}/followers
 */
function parseTopicFollowers(html) {
    var $ = cheerio.load(html)
    var items = $('.zm-person-item')

    if (!items.length) {
        return []
    }

    var followers = []

    for (var i = 0; i < items.length; i++) {
        var item = $(items[i])
        var followEle = $('.zg-btn-follow', item)
        var avatarEle = $('.zm-list-avatar-medium img', item)
        var nameEle = $('.zm-list-content-title a', item)

        var link = getAttr(nameEle, 'href')

        var follower = {
            name: getText(nameEle),
            uname: link.substring('/people/'.length),
            link: urls.full(link),
            avatar: getAttr(avatarEle, 'src'),
            hash: getAttr(followEle, 'id').substring('pp-'.length),
            followtime: toNum(getAttr(item, 'id').substring('mi-'.length)) * 1000
        }

        followers.push(follower)
    }

    return followers
}

/**
 * Parse answers of given topic.
 *
 * The page url has the following format:
 * https://www.zhihu.com/topic/${topicId}/top-answers
 */
function parseTopicAnswers(html) {
    var $ = cheerio.load(html)
    var items = $('.feed-item')

    if (!items.length) {
        return []
    }

    var answers = []

    for (var i = 0; i < items.length; i++) {
        var item = $(items[i])
        var contentEle = $('.feed-main .content', item)
        var quesEle = $('.question_link', item)
        var quesLink = getAttr(quesEle, 'href')
        var answerEle = $('.entry-body', contentEle)

        var answer = answerParser._parseAnswer($, answerEle)
        answer.question = {
            id: toNum(quesLink.substring('/question/'.length)),
            link: urls.full(quesLink),
            title: getText(quesEle)
        }
        answer.score = getData(item, 'score')

        answers.push(answer)
    }

    return answers
}

/**
 * Parse questions of given topic
 *
 * The page urls have the following format:
 * https://www.zhihu.com/topic/${topicId}/unanswered
 * https://www.zhihu.com/topic/${topicId}/questions
 */
function parseTopicQuestions(html) {
    var $ = cheerio.load(html)
    var items = $('.feed-item')

    if (!items.length) {
        return []
    }

    var questions = []

    for (var i = 0; i < items.length; i++) {
        var item = $(items[i])
        var linkEle = $('.question_link', item)
        var link = getAttr(linkEle, 'href')
        var answersEle = $('meta[itemprop="answerCount"]', item)
        var followersEle = $('.question-item-meta .meta-item:nth-child(3)', item)
        var qidEle = $('.js-questionUnhelpful', item)

        var question = {
            id: toNum(link.substring('/question/'.length)),
            link: urls.full(link),
            title: getText(linkEle),
            answers: toNum(getAttr(answersEle, 'count')),
            followers: toNum(getText(followersEle).split(' ')[0]),
            qid: getData(qidEle, 'qid'),
            crawltime: Date.now()
        }

        questions.push(question)
    }

    return questions
}
