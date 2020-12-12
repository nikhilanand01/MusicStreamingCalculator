import React, { Component } from "react";
import Chart from 'react-apexcharts';
import RadialChart from './RadialChart.js';


class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [{
        name: 'From Recording',
        data: [16255, 100558, 0]
      }, {
        name: 'From Writing',
        data: [17371, 3191, 3700]
      },{
        name: 'From Advance',
        data: [10000, 0, 0]
      }

    ],
      options: {
        chart: {
          stacked: true,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        responsive: [{
          breakpoint: 480,
        }],
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        xaxis: {
          type: 'Who',
          categories: ['Artist', 'Record Label', 'Publiser'],
        },
        legend: {
          position: 'bottom',
          horizontalAlign: 'right',
        },
        fill: {
          opacity: 1
        }
      },
    };
  }

  render() {
    return (
        <div id="chart">
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="bar"
            height={400}
            width={'95%'}/>
        </div>
    );
  }

}

export default BarChart;
