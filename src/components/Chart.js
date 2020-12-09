import React, { Component } from "react";
import Chart from 'react-apexcharts';


class TestChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [{
        name: 'From Recording',
        data: [44, 55]
      }, {
        name: 'From Writing',
        data: [13, 23]
      },{
        name: 'From Advance',
        data: [13, 0]
      }

    ],
      options: {
        chart: {
          type: 'bar',
          height: 350,
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
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }],
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        xaxis: {
          type: 'Who',
          categories: ['Artist', 'Partners'],
        },
        legend: {
          position: 'right',
          offsetY: 40
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
          <Chart options={this.state.options} series={this.state.series} type="bar" height={350}/>
        </div>
    );
  }

}

export default TestChart;
