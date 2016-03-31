# Zhihu API

**UNOFFICIAL** API for [zhihu](https://www.zhihu.com).

This projects implements only basic data APIs, meaning that you should implement your own logical code (by using this project) if you want a crawler/spider.

### Install

```
npm install zhihu-api --save
```

### Usage

```javascript
const fs = require('fs')
const api = require('zhihu-api')

// cookie must be set before any request
api.cookie(fs.readFileSync('./cookie'))

api.user('excited-vczh').detail()
    .then(console.log.bind(console))
    .catch(console.trace.bind(console))
```

which outputs:

```javascript
{
    name: 'vczh',
    uname: 'excited-vczh',
    link: 'https://www.zhihu.com/people/excited-vczh',
    biology: '专业造轮子，前排已拉黑。gaclib.net',
    weibo: 'http://weibo.com/vczh',
    // ... ...
}
```

### Example

The following example implements a quite simple crawler which crawls all followees of given account.

```javascript
const fs = require('fs')
const api = require('zhihu-api')

api.cookie(fs.readFileSync('./cookie'))

var offset = 0
var idx = 0

function getFollowees(uname) {
    api.user(uname).followees(offset)
        .then(followees => {
            offset += followees.length

            fs.writeFile(++idx + '.json', JSON.stringify(followees), function(err) {
                if (err) {
                    console.log('write file', idx, 'error')
                } else {
                    console.log('write file', idx)
                }
            })

            if (followees.length) {
                setTimeout(function() {
                    getFollowees(uname)
                }, 1000)
            }
        })
}

getFollowees('excited-vczh')
```

### API

**User**

- `api.user(uname)`
- `api.user(uname).detail()`
- `api.user(uname).profile()`
- `api.user(uname).followers(offset)`
- `api.user(uname).followees(offset)`
- `api.user(uname).answers(page)`
- `api.user(uname).collections(page)`
- `api.user(uname).columns()`
- `api.user(uname).topics(offset)`
- `api.user(uname).latestActivity()`
- `api.user(uname).followedColumns(offset)`

**Question**

- `api.question(questionId)`
- `api.question.latest()`
- `api.question.list(start, offset)`
- `api.question(questionId).answers().byVote(offset)`
- `api.question(questionId).answers().byPage(page)`

**Topic**

- `api.topic(topicId)`
- `api.topic.root()`
- `api.topic(topicId).hierarchy()`
- `api.topic(topicId).followers(start, offset)`
- `api.topic(topicId).topAnswers(page)`
- `api.topic(topicId).hotAnswers(offset)`
- `api.topic(topicId).newAnswers(offset)`
- `api.topic(topicId).pendingQuestions(page)`
- `api.topic(topicId).hotPendingQuestions(page)`

**Action**

- `api.action.follow(uname)`
- `api.action.unfollow(uname)`
- `api.action.sendMessage(uname, message)`
- `api.action.voteUp(id)`
- `api.action.voteDown(id)`
- `api.action.followTopic(tid)`
- `api.action.unfollowTopic(tid)`

**Misc**

- `api.cookie([_cookie])`

### License

[WTFPL](http://www.wtfpl.net/)
