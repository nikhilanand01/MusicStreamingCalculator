import React, { Component } from "react";
import Chart from "react-apexcharts";

class RadialChart extends Component {
   constructor(props) {
     super(props);
     this.state = {
         optionsRadial: {
           plotOptions: {
             radialBar: {
               startAngle: -135,
               endAngle: 225,
               hollow: {
                 margin: 0,
                 size: "70%",
                 background: "#fff",
                 image: undefined,
                 imageOffsetX: 0,
                 imageOffsetY: 0,
                 position: "front",
                 dropShadow: {
                   enabled: true,
                   top: 3,
                   left: 0,
                   blur: 4,
                   opacity: 0.24
                 }
               },
               track: {
                 background: "#fff",
                 strokeWidth: "60%",
                 margin: 0, // margin is in pixels
                 dropShadow: {
                   enabled: true,
                   top: -3,
                   left: 0,
                   blur: 4,
                   opacity: 0.35
                 }
               },
             }
           },
           fill: {
             type: "gradient",
             gradient: {
               shade: "dark",
               type: "horizontal",
               shadeIntensity: 0.5,
               gradientToColors: ['#32a852'],
               inverseColors: false,
               opacityFrom: 1,
               opacityTo: 1,
               stops: [0, 50, 100]
             },
             colors: ['#000']
           },
           stroke: {
             lineCap: "round"
           },
           labels: ["Recouped"]
         },
         seriesRadial: [100],
       };
    }



  render() {
    return (
      <div id="chart-radial">
        <Chart
          options={this.state.optionsRadial}
          series={this.state.seriesRadial}
          type="radialBar"
          height={350}
          width={300}/>
      </div>
      );
    }
  }

export default RadialChart;
