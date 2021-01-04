import React from "react";
import Chart from 'react-apexcharts';


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
          breakpoint: 140,
        }],
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        xaxis: {
          type: 'Who',
          categories: ['Artist(s)', 'Record Label', 'Publiser'],
        },
        legend: {
          position: 'bottom',
          horizontalAlign: 'center',
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
