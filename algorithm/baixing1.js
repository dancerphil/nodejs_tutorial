function foo(arr,k){
	var l = arr.length 
	console.log(l)
	for(var left=0,right=k;right!=k-2;left=(left+1)%k,right=(right+1)%l){
		var t = arr[left]
		arr[left] = arr[right]
		arr[right] = t
		console.log(arr)
	}
	console.log(arr)
}