/* App.js */
import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class App1 extends Component {	
	render() {
		const options = {
				animationEnabled: true,	
				title:{
					text: "Number of New Customers"
				},
				axisY : {
          crosshair: {
            enabled: true,
            color: "orange",
            labelFontColor: "#F8F8F8"
          },
					title: "Number of Customers"
				},
				axisX : {
          crosshair: {
            enabled: true,
            color: "blue",
            labelFontColor: "white"
          },
					title: "Month"
				},
				toolTip: {
					shared: true
				},
        legend: {
          cursor: "pointer",
          itemmouseover: function(e) {
            e.dataSeries.lineThickness = e.chart.data[e.dataSeriesIndex].lineThickness * 2;
            e.dataSeries.markerSize = e.chart.data[e.dataSeriesIndex].markerSize + 2;
            e.chart.render();
          },
          itemmouseout: function(e) {
            e.dataSeries.lineThickness = e.chart.data[e.dataSeriesIndex].lineThickness / 2;
            e.dataSeries.markerSize = e.chart.data[e.dataSeriesIndex].markerSize - 2;
            e.chart.render();
          },
          itemclick: function (e) {
            if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
              e.dataSeries.visible = false;
            } else {
              e.dataSeries.visible = true;
            }
            e.chart.render();
          }
        },
				data: [{
					type: "spline",
					name: "2016",
          lineDashType: "shortDash",
          color: "red",
					showInLegend: true,
					dataPoints: [
						{ y: 155, label: "Jan" },
						{ y: 150, label: "Feb" },
						{ y: 152, label: "Mar" },
						{ y: 148, label: "Apr" },
						{ y: 142, label: "May" },
						{ y: 150, label: "Jun" },
						{ y: 146, label: "Jul" },
						{ y: 149, label: "Aug" },
						{ y: 153, label: "Sept" },
						{ y: 158, label: "Oct" },
						{ y: 154, label: "Nov" },
						{ y: 150, label: "Dec" }
					]
				},
				{
					type: "spline",
					name: "2017",
          lineDashType: "dashDot",
          color: "red",
					showInLegend: true,
					dataPoints: [
						{ y: 172, label: "Jan" },
						{ y: 173, label: "Feb" },
						{ y: 175, label: "Mar" },
						{ y: 172, label: "Apr" },
						{ y: 162, label: "May" },
						{ y: 165, label: "Jun" },
						{ y: 172, label: "Jul" },
						{ y: 168, label: "Aug" },
						{ y: 175, label: "Sept" },
						{ y: 170, label: "Oct" },
						{ y: 165, label: "Nov" },
						{ y: 169, label: "Dec" }
					]
				}]
		}
		
		return (
		<div>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
 
export default App1;