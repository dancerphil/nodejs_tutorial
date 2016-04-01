const expect = require('chai').expect
const urls = require('../lib/urls')
const baseurl = urls._baseurl

describe('urls', function() {
    it('urls.index()', function() {
        expect(urls.index()).to.equal(baseurl)
    })

    it('urls.user.home(uname)', function() {
        expect(urls.user.home('test')).to
            .equal(baseurl + '/people/test')
    })

    it('urls.user.detail(uname)', function() {
        expect(urls.user.detail('test')).to
            .equal(baseurl + '/people/test/about')
    })

    it('urls.user.profile(uname)', function() {
        expect(urls.user.profile('test')).to
            .equal(baseurl + '/node/MemberProfileCardV2?params=%7B%22url_token%22%3A%22test%22%7D')
    })

    it('urls.user.followers()', function() {
        expect(urls.user.followers()).to
            .equal(baseurl + '/node/ProfileFollowersListV2')
    })

    it('urls.user.followees()', function() {
        expect(urls.user.followees()).to
            .equal(baseurl + '/node/ProfileFolloweesListV2')
    })

    it('urls.user.answers(uname, page)', function() {
        expect(urls.user.answers('test', 1)).to
            .equal(baseurl + '/people/test/answers?page=1')
    })

    it('urls.user.collections(uname, page)', function() {
        expect(urls.user.collections('test')).to
            .equal(baseurl + '/people/test/collections?page=1')
    })

    it('urls.user.columns(uname)', function() {
        expect(urls.user.columns('test')).to
            .equal(baseurl + '/people/test/posts')
    })

    it('urls.user.topics(uname)', function() {
        expect(urls.user.topics('test')).to
            .equal(baseurl + '/people/test/topics')
    })

    it('urls.user.followedColumns()', function() {
        expect(urls.user.followedColumns()).to
            .equal(baseurl + '/node/ProfileFollowedColumnsListV2')
    })

    it('urls.question.latest()', function() {
        expect(urls.question.latest()).to
            .equal(baseurl + '/log/questions')
    })

    it('urls.question.answersByVote()', function() {
        expect(urls.question.answersByVote()).to
            .equal(baseurl + '/node/QuestionAnswerListV2')
    })

    it('urls.question.answersByPage(questionId, page)', function() {
        expect(urls.question.answersByPage(41325553)).to
            .equal(baseurl + '/question/41325553?sort=created&page=1')

        expect(urls.question.answersByPage(41325553, 2)).to
            .equal(baseurl + '/question/41325553?sort=created&page=2')
    })

    it('urls.action.follow()', function() {
        expect(urls.action.follow()).to
            .equal(baseurl + '/node/MemberFollowBaseV2')
    })

    it('urls.action.sendMessage()', function() {
        expect(urls.action.sendMessage()).to
            .equal(baseurl + '/inbox/post')
    })

    it('urls.action.voteAnswer()', function() {
        expect(urls.action.voteAnswer()).to
            .equal(baseurl + '/node/AnswerVoteBarV2')
    })

    it('urls.action.followTopic()', function() {
        expect(urls.action.followTopic()).to
            .equal(baseurl + '/node/TopicFollowBaseV2')
    })

    it('urls.topic.organize(id)', function() {
        expect(urls.topic.organize(1234567)).to
            .equal(baseurl + '/topic/1234567/organize')
    })

    it('urls.topic.followers(id)', function() {
        expect(urls.topic.followers(1234567)).to
            .equal(baseurl + '/topic/1234567/followers')
    })

    it('urls.topic.topAnswers(id, page)', function() {
        expect(urls.topic.topAnswers(1234567)).to
            .equal(baseurl + '/topic/1234567/top-answers?page=1')

        expect(urls.topic.topAnswers(1234567, 2)).to
            .equal(baseurl + '/topic/1234567/top-answers?page=2')
    })

    it('urls.topic.hotAnswers(id)', function() {
        expect(urls.topic.hotAnswers(1234567)).to
            .equal(baseurl + '/topic/1234567/hot')
    })

    it('urls.topic.newAnswers(id)', function() {
        expect(urls.topic.newAnswers(1234567)).to
            .equal(baseurl + '/topic/1234567/newest')
    })

    it('urls.topic.pendingQuestions(id)', function() {
        expect(urls.topic.pendingQuestions(1234567)).to
            .equal(baseurl + '/topic/1234567/questions?page=1')

        expect(urls.topic.pendingQuestions(1234567, 2)).to
            .equal(baseurl + '/topic/1234567/questions?page=2')
    })

    it('urls.topic.hotPendingQuestions(id)', function() {
        expect(urls.topic.hotPendingQuestions(1234567)).to
            .equal(baseurl + '/topic/1234567/unanswered?page=1')

        expect(urls.topic.hotPendingQuestions(1234567, 2)).to
            .equal(baseurl + '/topic/1234567/unanswered?page=2')
    })
})
