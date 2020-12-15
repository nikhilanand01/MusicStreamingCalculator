import React, { Component } from "react";
import Chart from 'react-apexcharts';
import RadialChart from './RadialChart.js';


class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
            series={this.props.series}
            type="bar"
            height={400}
            width={'95%'}/>
        </div>
    );
  }

}

export default BarChart;
