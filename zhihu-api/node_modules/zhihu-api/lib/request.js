const request = require('request')
const cheerio = require('cheerio')
const urls = require('./urls')
const config = require('./config')

exports = module.exports = sendRequest
exports.xsrf = get_xsrf

function sendRequest(url, data) {
    if (!config.headers['Cookie']) {
        throw new Error('A cookie is needed. You should use `api.cookie(_cookie)` to set cookie.')
    }

    var opts = {
        headers: config.headers,
        url
    }

    if (data) {
        opts.method = 'POST'
        opts.form = data
    } else {
        opts.method = 'GET'
    }

    return new Promise(function(resolve, reject) {
        request(opts, function(err, res, body) {
            if (err) {
                return reject(err)
            }
            resolve(body)
        })
    })
}

function get_xsrf() {
    var data = config.data

    if (data.xsrf) {
        return Promise.resolve(data.xsrf)
    }

    return sendRequest(urls.index())
        .then(function(body) {
            var $ = cheerio.load(body)
            data.xsrf = $('input[name="_xsrf"]').val()
            return data.xsrf
        })
}
