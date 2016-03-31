const cheerio = require('cheerio')
const urls = require('../urls')
const util = require('./util')

const getAttr = util.getAttr
const getText = util.getText
const getData = util.getData
const toNum = util.toNum

module.exports = {
    parseUserDetail,
    parseUserProfile,
    parseUserFollows,
    parseUserActivity,
    parseUserColumns,
    parseUserTopics,
    parseUserFollowedColumns,
    parseUserCollections
}

/**
 * Parse detail of given user.
 *
 * The page url has the following format:
 * https://www.zhihu.com/people/${uname}/about
 */
function parseUserDetail(html) {
    var $ = cheerio.load(html)
    var profileMainEle = $('.zm-profile-header-main')
    var profileInfoEle = $('.zm-profile-header-info')
    var profileOpeEle = $('.zm-profile-header-operation')
    var profileNavEle = $('.profile-navbar')
    var followEle = $('.zm-profile-side-following')

    var nameEle = $('.name', profileMainEle)
    var bioEle = $('.bio', profileMainEle)
    var weiboEle = $('.zm-profile-header-user-weibo', profileMainEle)
    var avatarEle = $('.Avatar', profileMainEle)

    var locationEle = $('.item.location', profileInfoEle)
    var businessEle = $('.item.business', profileInfoEle)
    var genderEle = $('.item.gender .icon', profileInfoEle)
    var companyEle = $('.item.employment', profileInfoEle)
    var positionEle = $('.item.position', profileInfoEle)
    var schoolEle = $('.item.education', profileInfoEle)
    var majorEle = $('.item.education-extra', profileInfoEle)
    var descriptionEle = $('.description.unfold-item > .content', profileInfoEle)

    var agreesEle = $('.zm-profile-header-user-agree > strong', profileOpeEle)
    var thanksEle = $('.zm-profile-header-user-thanks > strong', profileOpeEle)
    var hashEle = $('.zm-rich-follow-btn', profileOpeEle)

    var navEles = $('.item', profileNavEle)
    var asksEle = $('.num', navEles[1])
    var answersEle = $('.num', navEles[2])
    var postsEle = $('.num', navEles[3])
    var collectionsEle = $('.num', navEles[4])
    var logsEle = $('.num', navEles[5])

    var followeeEle = $('.item:first-child > strong', followEle)
    var followerEle = $('.item:last-child > strong', followEle)

    var link = getAttr(nameEle, 'href')

    var profile = {
        name: getText(nameEle),
        uname: link.substring('/people/'.length),
        link: urls.full(link),
        biology: getAttr(bioEle, 'title'),
        weibo: getAttr(weiboEle, 'href'),
        avatar: getAttr(avatarEle, 'src'),
        location: getAttr(locationEle, 'title'),
        business: getAttr(businessEle, 'title'),
        gender: getAttr(genderEle, 'class').substring('icon icon-profile-'.length),
        company: getAttr(companyEle, 'title'),
        position: getAttr(positionEle, 'title'),
        school: getAttr(schoolEle, 'title'),
        major: getAttr(majorEle, 'title'),
        description: getText(descriptionEle).trim(),
        hash: getData(hashEle, 'id'),
        agrees: toNum(getText(agreesEle)),
        thanks: toNum(getText(thanksEle)),
        asks: toNum(getText(asksEle)),
        answers: toNum(getText(answersEle)),
        posts: toNum(getText(postsEle)),
        collections: toNum(getText(collectionsEle)),
        logs: toNum(getText(logsEle)),
        followees: toNum(getText(followeeEle)),
        followers: toNum(getText(followerEle)),
        crawltime: Date.now()
    }

    // if you are blocked by this user
    // or it's yourself
    if (!profile.hash) {
        var currentEle = $('.json-inline[data-name="current_people"]')
        var info = JSON.parse(getText(currentEle))
        profile.hash = info[3]
    }

    return profile
}

/**
 * Parse profile of given user.
 *
 * You can get the html by hovering the cursor on one's name.
 * Note that the answers, posts, and followers are strings
 * instead of numbers. So for a user has many followers, the
 * followers in profile many be 20K instead of 20000.
 *
 * The url has the following format:
 * https://www.zhihu.com/node/MemberProfileCardV2?params={"url_token":"${uname}"}
 */
function parseUserProfile(html) {
    var $ = cheerio.load(html)
    var upperEle = $('.upper')
    var lowerEle = $('.lower')

    var linkEle = $('.avatar-link', upperEle)
    var avatarEle = $('.Avatar', upperEle)
    var nameEle = $('.name', upperEle)
    var genderEle = $('i.icon-profile-male', upperEle) || $('i.icon-profile-female', upperEle)
    var bioEle = $('.tagline', upperEle)

    var metaEles = $('.meta .item', lowerEle)
    var answersEle = $('.value', metaEles[0])
    var postsEle = $('.value', metaEles[1])
    var followerEle = $('.value', metaEles[2])
    var hashEle = $('.zm-rich-follow-btn', lowerEle)

    var link = getAttr(linkEle, 'href')

    var profile = {
        name: getText(nameEle),
        uname: link.substring('/people/'.length),
        link: urls.full(link),
        avatar: getAttr(avatarEle, 'src'),
        gender: getAttr(genderEle, 'class').substring('icon icon-profile-'.length),
        biology: getText(bioEle),
        answers: getText(answersEle),
        posts: getText(postsEle),
        followers: getText(followerEle),
        hash: getData(hashEle, 'id'),
        crawltime: Date.now()
    }

    return profile
}

/**
 * Parse followees and followers of given user.
 *
 * The page urls have the following format:
 * https://www.zhihu.com/people/${uname}/followees
 * https://www.zhihu.com/people/${uname}/followers
 */
function parseUserFollows(htmls) {
    var follows = htmls.map(html => {
        var $ = cheerio.load(html)
        var hashEle = $('.zm-rich-follow-btn')
        var linkEle = $('.zm-item-link-avatar')

        var link = getAttr(linkEle, 'href')

        var profile = {
            name: getAttr(linkEle, 'title'),
            uname: link.substring('/people/'.length),
            link: urls.full(link),
            hash: getData(hashEle, 'id')
        }

        return profile
    })

    return follows
}

/**
 * Parse the latest activity of given user.
 *
 * The page url has the following format:
 * https://www.zhihu.com/people/${uname}
 */
function parseUserActivity(html) {
    var $ = cheerio.load(html)
    var items = $('#zh-profile-activity-page-list > .zm-item')

    if (!items.length) {
        return null
    }

    var item = $(items[0])

    var activity = {
        time: getData(item, 'time') * 1000,
        type: getData(item, 'type-detail'),
        crawltime: Date.now()
    }

    return activity
}

/**
 * Parse column posts of given user.
 *
 * The page url has the following format:
 * https://www.zhihu.com/people/${uname}/posts
 */
function parseUserColumns(html) {
    var $ = cheerio.load(html)
    var items = $('#zh-profile-posts .column')

    if (!items.length) {
        return []
    }

    var columns = []
    var currentEle = $('.json-inline[data-name="current_people"]')
    var info = JSON.parse(getText(currentEle))
    var user = {
        name: info[0],
        uname: info[1],
        link: urls.full('/people/' + info[1])
    }

    for (var i = 0; i < items.length; i++) {
        var item = $(items[i])
        var linkEle = $('.header > a', item)
        var avatarEle = $('.Avatar', linkEle)
        var followEle = $('.header .followers-link', item)
        var postEle = $('.posts .post', item)
        var footerEle = $('.footer > a', item)

        var link = getAttr(linkEle, 'href')

        var column = {
            name: getAttr(avatarEle, 'alt'),
            avatar: getAttr(avatarEle, 'src'),
            link: link,
            uname: link.substring(link.lastIndexOf('/') + 1),
            followers: toNum(getText(followEle).split(' ')[0]),
            posts: toNum(getText(footerEle).split(' ')[1]) || postEle.length,
            crawltime: Date.now(),
            user
        }

        columns.push(column)
    }

    return columns
}

/**
 * Parse topics that given user followed.
 *
 * The page url has the following format:
 * https://www.zhihu.com/people/${uname}/topics
 */
function parseUserTopics(html) {
    var $ = cheerio.load(html)
    var items = $('.zm-profile-section-item')

    if (!items.length) {
        return []
    }

    var topics = []

    for (var i = 0; i < items.length; i++) {
        var item = $(items[i])
        var linkEle = $('.zm-list-avatar-link', item)
        var avatarEle = $('.zm-list-avatar-medium', item)
        var nameEle = $('.zm-profile-section-main strong', item)

        var link = getAttr(linkEle, 'href')

        var topic = {
            tid: toNum(getAttr(item, 'id').substring('tpi-'.length)),
            id: toNum(link.substring('/topic/'.length)),
            link: urls.full(link),
            avatar: getAttr(avatarEle, 'src'),
            name: getText(nameEle)
        }

        topics.push(topic)
    }

    return topics
}

/**
 * Parse columns that given user followed.
 *
 * The page url has the following format:
 * https://www.zhihu.com/people/${uname}/columns/followed
 */
function parseUserFollowedColumns(htmls) {
    var columns = htmls.map(html => {
        var $ = cheerio.load(html)
        var linkEle = $('.zm-list-avatar-link')
        var avatarEle = $('.zm-list-avatar-medium')
        var nameEle = $('.zm-profile-section-main strong')
        var descEle = $('.zm-profile-section-main .description')
        var metaEle = $('.zm-profile-section-main .meta span')

        var link = getAttr(linkEle, 'href')

        var column = {
            link: link,
            uname: link.substring(link.lastIndexOf('/') + 1),
            avatar: getAttr(avatarEle, 'src'),
            name: getText(nameEle),
            description: getText(descEle),
            posts: toNum(getText(metaEle).split(' ')[0]) || 0
        }

        return column
    })

    return columns
}

/**
 * Parse collections of given user.
 *
 * The page url has the following format:
 * https://www.zhihu.com/people/${uname}/collections
 */
function parseUserCollections(html) {
    var $ = cheerio.load(html)
    var items = $('#zh-profile-fav-list .zm-profile-section-item')

    if (!items.length) {
        return []
    }

    var collections = []
    var currentEle = $('.json-inline[data-name="current_people"]')
    var info = JSON.parse(getText(currentEle))
    var user = {
        name: info[0],
        uname: info[1],
        link: urls.full('/people/' + info[1])
    }

    for (var i = 0; i < items.length; i++) {
        var item = $(items[i])
        var titleEle = $('.zm-profile-fav-item-title', item)
        var metaEle = $('.zm-profile-fav-bio', item)
        var followEle = $('.zg-btn-follow', item)

        var link = getAttr(titleEle, 'href')
        var meta = getText(metaEle).trim().split('•')

        var collection = {
            name: getText(titleEle),
            id: toNum(link.substring('/collection/'.length)),
            fvid: toNum(getAttr(followEle, 'id').substring('/fv-/'.length)),
            link: urls.full(link),
            answers: toNum(meta[0].split(' ')[0]),
            followers: toNum(meta[1].split(' ')[0]),
            crawltime: Date.now(),
            user
        }

        collections.push(collection)
    }

    return collections
}
