const fs = require('fs')
const path = require('path')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const config = require('../../lib/config')
const topic = require('../../lib/api/topic')

var cookiePath = path.join(__dirname, '../../cookie')
config.setCookie(fs.readFileSync(cookiePath))

chai.use(chaiAsPromised)
const expect = chai.expect

var topicId = 19554791

describe('api.topic', function() {
    this.timeout(10000)

    it('api.topic(id)', function() {
        var tpc = topic(topicId)
        expect(tpc).to.have.property('_topic')
        expect(tpc._topic).to.have.property('id')
        expect(tpc._topic.id).to.equal(topicId)
    })

    it('api.topic.root()', function() {
        var rt = topic.root()
        expect(rt).to.be.a('promise')
        return expect(rt).to.eventually.be.an('object')
    })

    it('#topic.hierarchy()', function() {
        var hierarchy = topic(topicId).hierarchy()
        expect(hierarchy).to.be.a('promise')
        return expect(hierarchy).to.eventually.be.an('object')
    })

    it('#topic.followers(start, offset)', function() {
        var followers = topic(topicId).followers()
        expect(followers).to.be.a('promise')
        return expect(followers).to.eventually.be.an('array')
    })

    it('#topic.topAnswers(page)', function() {
        var answers = topic(topicId).topAnswers()
        expect(answers).to.be.a('promise')
        return expect(answers).to.eventually.be.an('array')
    })

    it('#topic.hotAnswers(offset)', function() {
        var answers = topic(topicId).hotAnswers()
        expect(answers).to.be.a('promise')
        return expect(answers).to.eventually.be.an('array')
    })

    it('#topic.newAnswers(offset)', function() {
        var answers = topic(topicId).newAnswers()
        expect(answers).to.be.a('promise')
        return expect(answers).to.eventually.be.an('array')
    })

    it('#topic.pendingQuestions(page)', function() {
        var questions = topic(topicId).pendingQuestions()
        expect(questions).to.be.a('promise')
        return expect(questions).to.eventually.be.an('array')
    })

    it('#topic.hotPendingQuestions(page)', function() {
        var questions = topic(topicId).hotPendingQuestions()
        expect(questions).to.be.a('promise')
        return expect(questions).to.eventually.be.an('array')
    })
})
