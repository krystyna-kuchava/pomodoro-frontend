import Highcharts from 'highcharts';

//render chart of day
//parameter: data for chart of day
export function createChartOfDay(data) {
  Highcharts.chart('containerCharts', {
    chart: {
      type: 'column',
      backgroundColor: '#2A3F50'
    },
    title: {
      text: ''
    },
    colors: ['#9F9F9F', '#F75C4C', '#FFA841', '#FDDC43', '#1ABC9C'],
    xAxis: {
      type: 'category',
      tickInterval: 1,
      fill: '#fff'
    },
    yAxis: {
      min: 0,
      title: {
        text: ''
      },
      gridLineColor: '#8dA5B8'
    },
    legend: {
      enabled: false
    },
    tooltip: {
      formatter: function () {
        const categories = ['Failed', 'Urgent', 'High', 'Normal', 'Low'];
        return categories[this.x] + ': ' + this.y;
      }
    },
    plotOptions: {
      column: {
        border: '0'
      }
    },
    series: [{
      name: '',
      data: data,
      colorByPoint: true
    }]
  });
}
