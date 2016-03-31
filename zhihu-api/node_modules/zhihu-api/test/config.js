const expect = require('chai').expect
const config = require('../lib/config')

describe('config', function() {
    it('config.headers', function() {
        expect(config.headers).to.have.property('User-Agent')
            .which.is.a('string')

        expect(config.headers).to.have.property('Cookie')
            .which.is.a('string')
    })

    it('config.setCookie(cookie)', function() {
        var cookie = 'this is my cookie'
        expect(config.setCookie).to.be.a('function')
        config.setCookie(cookie)
        expect(config.headers.Cookie).to.equal(cookie)
    })

    it('config.setUserAgent(userAgent)', function() {
        var userAgent = 'this is my user-agent'
        expect(config.setUserAgent).to.be.a('function')
        config.setUserAgent(userAgent)
        expect(config.headers['User-Agent']).to.equal(userAgent)
    })
})
