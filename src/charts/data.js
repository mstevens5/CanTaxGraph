
const options = {
  theme: 'light2',
  animationEnabled: true,
  title: {
    text: 'CanvasJS Chart - React Functional Component',
  },
  axisY : {
    crosshair: {
      enabled: true,
      color: "orange",
      labelFontColor: "#F8F8F8"
    },
    title: "Tax Amount"
  },
  axisX : {
    crosshair: {
      enabled: true,
      color: "blue",
      labelFontColor: "white"
    },
    title: "Income"
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
  data: [
    {
      type: 'line',
      name: "McLine",
      lineDashType: "shortDash",
      showInLegend: true,
      dataPoints: [
        { x: 10, y: 71 }
        /*{ x: 10, y: 71 },
        { x: 11, y: 71 },
        { x: 12, y: 71 },
        { x: 13, y: 71 },
        { x: 14, y: 71 },
        { x: 15, y: 71 },
        { x: 16, y: 71 },
        { x: 17, y: 71 },
        { x: 18, y: 71 },
        { x: 19, y: 71 },
        { x: 20, y: 55 },
        { x: 25, y: 55 },
        { x: 30, y: 50 },
        { x: 35, y: 50 },
        { x: 40, y: 65 },
        { x: 45, y: 65 },
        { x: 50, y: 92 },
        { x: 55, y: 92 },
        { x: 60, y: 68 },
        { x: 65, y: 68 },
        { x: 70, y: 38 },
        { x: 75, y: 38 },
        { x: 80, y: 71 },
        { x: 85, y: 71 },
        { x: 90, y: 54 },
        { x: 95, y: 54 },
        { x: 100, y: 60 },*/
      ],
    },
  ],
};

export default options