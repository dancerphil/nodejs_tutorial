const expect = require('chai').expect
const cheerio = require('cheerio')
const util = require('../../lib/parser/util')

var domstr = '<div id="example" class="container" data-name="test" data-id="123456" data-count="0">hello</div>'
var $ = cheerio.load(domstr)
var ele = $('div')

describe('parser util', function() {
    it('util.getAttr(ele, attr)', function() {
        expect(util.getAttr(ele, 'id')).to.equal('example')
        expect(util.getAttr(ele, 'class')).to.equal('container')
    })

    it('util.getText(ele)', function() {
        expect(util.getText(ele)).to.equal('hello')
    })

    it('util.getData(ele, name)', function() {
        expect(util.getData(ele, 'name')).to.equal('test')
        expect(util.getData(ele, 'id')).to.equal(123456)
        expect(util.getData(ele, 'count')).to.equal(0)
        expect(util.getData(ele, 'none')).to.equal('')
    })

    it('util.toNum(val)', function() {
        expect(util.toNum(null)).to.equal(0)
        expect(util.toNum(undefined)).to.equal(0)
        expect(util.toNum([])).to.equal(0)
        expect(util.toNum('')).to.equal(0)
        expect(util.toNum('hell0')).to.equal(0)
        expect(util.toNum('123hell')).to.equal(123)
        expect(util.toNum('12345')).to.equal(12345)
    })
})
