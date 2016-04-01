var userAgent = ['Mozilla/5.0 (Windows NT 6.3; WOW64)',
    'AppleWebKit/537.36 (KHTML, like Gecko)',
    'Chrome/48.0.2564.116 Safari/537.36'
].join(' ')

var headers = {
    'User-Agent': userAgent,
    'Cookie': ''
}

var data = {
    xsrf: ''
}

function setCookie(cookie) {
    if (Buffer.isBuffer(cookie)) {
        cookie = cookie.toString()
    }
    headers['Cookie'] = (cookie || '').trim()

    // xsrf must be reset when cookie changes
    data.xsrf = ''
}

function setUserAgent(userAgent) {
    headers['User-Agent'] = (userAgent || '').trim()
}

module.exports = {
    setCookie,
    setUserAgent,
    headers,
    data
}
