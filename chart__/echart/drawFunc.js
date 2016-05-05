
function drawFunc() {
	var func = document.getElementById('func').value
	console.log(func)
	var rangeMin = +document.getElementById('rangeMin').value
	var rangeMax = +document.getElementById('rangeMax').value
	var rangeStep = +document.getElementById('rangeStep').value
	draw(func,rangeMin,rangeMax,rangeStep)
}

window.onload=drawFunc
document.getElementById('but').onclick = drawFunc

function draw(func,rangeMin=-10,rangeMax=10,rangeStep=0.1) {
	function fixNumber(i){
		return new Number(i).toFixed(3)-0
	}
	var myChart = echarts.init(document.getElementById('main'));
	var xs = [];

	var data = [];

	for (var x = fixNumber(rangeMin); x < rangeMax; x=fixNumber(x+rangeStep)) {
		xs.push(x);
		data.push(fixNumber(eval(func)));
	}

	option = {
		tooltip: {
			trigger: 'axis'
		},
		title: {
			left: 'center',
			text: 'drawFunc',
		},
		legend: {
			top: 'bottom',
			data:['这个在哪里出现？']
		},
		toolbox: {
			show: true,
			feature: {
				dataView: {show: true, readOnly: false},
				magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
				restore: {show: true},
				saveAsImage: {show: true}
			}
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: xs
		},
		yAxis: {
			type: 'value',
			boundaryGap: [0, '100%']
		},
		dataZoom: [{
			type: 'inside',
			start: 0,
			end: 10
		}, {
			start: 0,
			end: 10
		}],
		series: [
			{
				name:'y:',
				type:'line',
				smooth:true,
				symbol: 'none',
				sampling: 'average',
				itemStyle: {
					normal: {
						color: 'rgb(255, 70, 131)'
					}
				},
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgb(255, 158, 68)'
						}, {
							offset: 1,
							color: 'rgb(255, 70, 131)'
						}])
					}
				},
				data: data
			}
		]
	};

	myChart.setOption(option);
}

