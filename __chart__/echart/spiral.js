
var myChart = echarts.init(document.getElementById('main'));
var data = [];

for (var i = 0; i <= 3600; i++) {
    var t = i / 180 * Math.PI;
    var r = (t - t * (i % 2 ? 0.1 : -0.1) ).toFixed(3) - 0
    // var r = (t - t * (i % 2 ? 0.1 : -0.1) * Math.random()).toFixed(3) - 0
    data.push([r, i]);
}

option = {
    title: {
        text: '极坐标双数值轴'
    },
    legend: {
        data: ['line']
    },
    polar: {
        center: ['50%', '54%']
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },
    angleAxis: {
        type: 'value',
        startAngle: 0
    },
    radiusAxis: {
        min: 0
    },
    series: [{
        coordinateSystem: 'polar',
        name: 'line',
        type: 'line',
        showSymbol: false,
        data: data
    }],
    animationDuration: 2000
};
myChart.setOption(option);


