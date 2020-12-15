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
                 size: "45%",
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
                 strokeWidth: "50%",
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
               gradientToColors: ['#1971ff'],
               inverseColors: false,
               opacityFrom: 1,
               opacityTo: 1,
               stops: [22]
             },
             colors: ['#CBDCFC']
           },
           stroke: {
             lineCap: "round"
           },
           labels: ["Recouped"]
         },
       };
    }



  render() {
    return (
      <div id="chart-radial">
        <Chart
          options={this.state.optionsRadial}
          series={this.props.series}
          type="radialBar"
          height={200}
          width={200}/>
      </div>
      );
    }
  }

export default RadialChart;
