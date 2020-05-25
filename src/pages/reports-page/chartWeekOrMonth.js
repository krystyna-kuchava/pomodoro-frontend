import Highcharts from 'highcharts';

//render chart of week or month (depends on data)
//parameters:
// categories for chart,
// data for chart of week or month,
// type of first chart group,
// type of second chart group
export function creatChartForWeekOrMonth(categories, data, stack1, stack2) {
  Highcharts.chart('containerCharts', {
    chart: {
      type: 'column',
      backgroundColor: '#2A3F50'
    },
    title: {
      text: ''
    },
    colors: ['#F75C4C', '#FFA841', '#FDDC43', '#1ABC9C', '#9F9F9F'],
    xAxis: {
      categories: categories,
      tickInterval: 1
    },
    yAxis: {
      allowDecimals: false,
      min: 0,
      title: {
        text: ''
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      formatter: function () {
        return this.series.name + ': ' + this.y;
      }
    },
    plotOptions: {
      column: {
        stacking: 'normal'
      }
    },
    series: [{
      name: 'Urgent',
      data: data[0],
      stack: stack1
    }, {
      name: 'High',
      data: data[1],
      stack: stack1
    }, {
      name: 'Normal',
      data: data[2],
      stack: stack1
    }, {
      name: 'Low',
      data: data[3],
      stack: stack1
    } , {
      name: 'Failed',
      data: data[4],
      stack: stack2
    }]
  });
}

