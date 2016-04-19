function init(n) {
	for(var i = 0; i < n; i++){
		f[i] = []
	}
	console.log(foo(0, n-1))
}
function foo(left, right) {
	if(f[left][right]) return f[left][right]
	if(right-left == -1) return 0
	if(right-left == 0) return 1
	if(str[left] == str[right]) {
		f[left][right] = foo(left+1,right-1) + 2
		return f[left][right]
	}
	else {
		f[left][right] = max(foo(left + 1, right), foo(left, right - 1))
		return f[left][right]
	}
}
function max(a, b) {
	if(a > b) return a
	return b
}

function work(n){
	for(var i = 0; i < n; i++){
		f[i] = []
		f[i][i] = 1
	}
	for(var i = n - 2; i >= 0; i--){
		for(var j = i + 1; j < n; j++){
			if(str[i] == str[j]){
				f[i][j] = f[i+1][j-1] + 2
			}
			else {
				f[i][j] = max(f[i+1][j], f[i][j-1])
			}
		}
	}
	console.log(f[0][n-1])
}

var str='abcbaaaaa'
var f = []
init(str.length)
work(str.length)