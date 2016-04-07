
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));

// 指定图表的配置项和数据
var option = {
    backgroundColor: '#2c343c',

    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
    },
    series: [
        {
            type:'pie',
            selectedMode: 'single',
            radius: [0, '10%'],
            label: {
                normal: {
                    position: 'inner'
                }
            },
            data:[
                { itemStyle: { normal:{color:'#fff'}} },
                { itemStyle: { normal:{color:'#000'}} },
            ]
        },{
            type:'pie',
            selectedMode: 'single',
            radius: ['10%', '20%'],
            label: {
                normal: {
                    position: 'inner'
                }
            },
            data:[
                { itemStyle: { normal:{color:'#fff'}} },
                { itemStyle: { normal:{color:'#000'}} },
                { itemStyle: { normal:{color:'#000'}} },
                { itemStyle: { normal:{color:'#fff'}} },
            ]
        },{
            type:'pie',
            selectedMode: 'single',
            radius: ['20%', '30%'],
            label: {
                normal: {
                    position: 'inner'
                }
            },
            data:[
                { itemStyle: { normal:{color:'#fff'}} },
                { itemStyle: { normal:{color:'#000'}} },
                { itemStyle: { normal:{color:'#000'}} },
                { itemStyle: { normal:{color:'#fff'}} },
                { itemStyle: { normal:{color:'#fff'}} },
                { itemStyle: { normal:{color:'#000'}} },
                { itemStyle: { normal:{color:'#000'}} },
                { itemStyle: { normal:{color:'#fff'}} },
            ]
        },{
            type:'pie',
            selectedMode: 'single',
            radius: ['30%', '40%'],
            label: {
                normal: {
                    position: 'inner'
                }
            },
            data:[
                { itemStyle: { normal:{color:'#fff'}} },
                { itemStyle: { normal:{color:'#000'}} },
                { itemStyle: { normal:{color:'#000'}} },
                { itemStyle: { normal:{color:'#fff'}} },
                { itemStyle: { normal:{color:'#fff'}} },
                { itemStyle: { normal:{color:'#000'}} },
                { itemStyle: { normal:{color:'#000'}} },
                { itemStyle: { normal:{color:'#fff'}} },
                { itemStyle: { normal:{color:'#fff'}} },
                { itemStyle: { normal:{color:'#000'}} },
                { itemStyle: { normal:{color:'#000'}} },
                { itemStyle: { normal:{color:'#fff'}} },
                { itemStyle: { normal:{color:'#fff'}} },
                { itemStyle: { normal:{color:'#000'}} },
                { itemStyle: { normal:{color:'#000'}} },
                { itemStyle: { normal:{color:'#fff'}} },
            ]
        },

    ]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);