
// let should = require('should')
// let React = require('react')
window.onload = function () {
// let should = require('should')
let xSetting = 30
let ySetting = 16
let bombSetting = 99
function getInitialState() {
	let bombs = []
	let bombsXLen = xSetting + 2
	let bombsYLen = ySetting + 2
	for (let i = 0; i < bombsXLen; i++) {
		let item = []
		for (let j = 0; j < bombsYLen; j++) {
			item.push(0)
		}
		bombs.push(item)
	}
	for (let i = 0; i < bombSetting; i++) {
		let x = Math.floor(Math.random() * xSetting) + 1
		let y = Math.floor(Math.random() * ySetting) + 1
		while(bombs[x][y]!=0) {
			x = Math.floor(Math.random() * xSetting) + 1
			y = Math.floor(Math.random() * ySetting) + 1
		}
		bombs[x][y] = 1
	}
	let lands = []
	let cover = []
	for (let i = 1; i < bombsXLen-1; i++) {
		let landsItem = []
		let coverItem = []
		for (let j = 1; j < bombsYLen-1; j++) {
			let temp = [
				bombs[i-1][j-1],bombs[i][j-1],bombs[i+1][j-1],
				bombs[i-1][j],                bombs[i+1][j],
				bombs[i-1][j+1],bombs[i][j+1],bombs[i+1][j+1],
				].reduce((a,b)=>a+b, 0)
			if(bombs[i][j] == 1) {
				temp = -1
			}
			landsItem.push(temp)
			coverItem.push(true)
		}
		lands.push(landsItem)
		cover.push(coverItem)
	}
	return {
		lands,
		cover,
		itemCount: xSetting * ySetting,
		xLen: xSetting,
		yLen: ySetting,
	};
  }
let state = getInitialState()

// ------test------
document.getElementById("playground2").innerHTML = state.lands.map((items,x)=>{
	return `<div>`+items.map((item,x)=>{
		return `<span style="width: 10px; height: 10px; background-color: #eee">${item}</span>`
	})+`</div> <br>`
})

// let sum = 0
// for (let i = 0; i < xSetting; i++) {
//   for (let j = 0; j < ySetting; j++) {
//   	if(state.lands[i][j]==-1)
// 	sum += 1
//   }
// }
// sum.should.equal(99)

}