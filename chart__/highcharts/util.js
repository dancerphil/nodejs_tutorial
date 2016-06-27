// function h(x,y){
//   Highcharts.chart('container', {
//         chart: {
//             type: 'area'
//         },
//         title: {
//             text: 'Monthly Average Temperature'
//         },
//         subtitle: {
//             text: 'Source: WorldClimate.com'
//         },
//         xAxis: {
//             categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//                 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
//         },
//         plotOptions: {
//             spline: {
//                 marker: {
//                     radius: 4,
//                     lineColor: '#666666',
//                     lineWidth: 1
//                 }
//             }
//         },
//         series: [{
//             name: 'Tokyo',
//             data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]

//         }, {
//             name: 'London',
//             data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
//         }]
//     });
// }
function h(x,y){
  Highcharts.chart('container', {
    // $('#container').highcharts({
        chart: {
          type: 'area',
          animation: false,
          // backgroundColor: 'rgba(0,0,0,0)'
        },
        title: { text: '' },
        credits: { enabled: false },
        plotOptions: {
          area: {
            animation: false,
            dataLabels: {
              enabled: true,
              formatter: function () {
                var y = this.y
                var code = this.point.code
                return `
                  <div class='chart-label'>
                    <div class='wi wi-${code}')></div>
                    <div class='temp'>${y}℃</div>
                  </div>
                `
              },
              useHTML: true,
              align: 'center',
              verticalAlign: 'bottom',
              reserveSpace: true,
              overflow: 'none',
              crop: false,
              y: -5,
              style: {
                // fontWeight: 'normal',
                // color: '#606060'
              }
            },
            // color: '#FF0000',
            // lineWidth: 1,
            fillColor: {
              // linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
              // stops: [
              //   [0, Highcharts.Color('#FF4B02').setOpacity(0.4).get('rgba')],
              //   [1, Highcharts.Color('#FF4B02').setOpacity(0.1).get('rgba')]
              // ]
            },
            marker: {
              // radius: 4,
              // lineColor: '#fff',
              // lineWidth: 1
            }
          }
        },
        tooltip: {
          // backgroundColor: '#FFFFFF',
          pointFormat: '{series.name}: <b>{point.y}</b><br/>天气: <b>{point.text}</b>',
          valueSuffix: '℃',
          borderWidth: 0,
          shape: 'square',
          style: {
            padding: 0
          },
          useHTML: true
        },
        xAxis: {
          categories: x,
          crosshair: false,
          tickLength: 0,
          tickWidth: 1,
          labels: { autoRotation: false },
          lineWidth: 0
        },
        yAxis: {
          min: 1 - 1,
          max: 9 + (9 - 1 + 1) * 0.7,
          gridLineWidth: 0,
          title: { text: '' },
          labels: { enabled: false }
        },
        series: [{
          name: '温度',
          data: y
        }],
        legend: { enabled: false }
    });
}