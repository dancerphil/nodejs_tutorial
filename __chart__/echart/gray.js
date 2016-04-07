
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));
var option = {
    backgroundColor: '#4c545c',tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
    },
    series: []
}
make(8)
function make(n) {
    for(var i = 0; i < n; i++){
        option.series.push({
            type:'pie',
            selectedMode: 'single',
            radius: [i/n*90+'%', (i+1)/n*90+'%'],
            label: {
                normal: {
                    position: 'inner'
                }
            },
            data:foo(i)
        })
    }
}

function  foo(i) {
    if(i==0)return [
        { itemStyle: { normal:{color:'#fff'}} },
        { itemStyle: { normal:{color:'#000'}} },
    ]
    else if(i==1)return [
        { itemStyle: { normal:{color:'#fff'}} },
        { itemStyle: { normal:{color:'#000'}} },
        { itemStyle: { normal:{color:'#000'}} },
        { itemStyle: { normal:{color:'#fff'}} },
    ]
    else {
        var temp=foo(i-1)
    }return temp.concat(temp)
}

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);