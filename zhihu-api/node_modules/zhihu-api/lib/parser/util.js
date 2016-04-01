function getAttr(ele, attr) {
    return ele && typeof ele.attr === 'function' ? ele.attr(attr) || '' : ''
}

function getText(ele) {
    return ele && typeof ele.text === 'function' ? ele.text() || '' : ''
}

function getData(ele, name) {
    var data = ele && typeof ele.data === 'function' ? ele.data(name) : ''
    return typeof data === 'number' ? data : (data || '')
}

function toNum(val) {
    if (!val) {
        return 0
    }
    val = parseInt(val, 10)
    return val ? val : 0
}

module.exports = {
    getAttr,
    getText,
    getData,
    toNum
}
