var count=0
var controller = {
	// count:0,

	isBusy: function(){
		if(count>4){
			return true
		}
		else {
			return false
		}
	},

	lock:function(){
		count++
		return count
	},

	unlock:function(){
		count--
		return count
	},

	addTask:function(){
		console.log(this.lock())
		console.log(this.unlock())
  }
}
console.log(controller.lock())
console.log(controller.lock())
console.log(controller.lock())
console.log(controller.isBusy())
console.log(controller.lock())
console.log(controller.lock())
console.log(controller.isBusy())
console.log(controller.unlock())
console.log(controller.unlock())
console.log(controller.isBusy())


controller.addTask()
controller.addTask()
controller.addTask()
controller.addTask()