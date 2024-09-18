let unit_m = "%"
let colors = ["#000000", //black
  "#ff00ff", // blue
  "#00bfff", // deepskyblue
  "darkgreen", // dodgerblue
  "#ffa500", // orange
  "red"] // darkcyan 

const options = {
  theme: 'light2',
  toolTip: {
    shared: true,
    contentFormatter: function (e) {
      var content = "";

      e.entries.sort(function(a,b) {
        return b.dataPoint.y - a.dataPoint.y;
      });

      content	+= e.entries[0].dataPoint.label;
      content += "<br/>";

      var entries = e.entries;
      for(var j = 0; j < entries.length; j++) {
        content	+= "<span style=\"color:" + entries[j].dataSeries.color+"\"\>" + entries[j].dataSeries.name + " </span>: " + "<strong>" + entries[j].dataPoint.y + "</strong>";
        content += "<br/>"; 
      } 
      return content;

    }
  },
  animationEnabled: false,
  title: {
    text: 'Individual Taxes Owed',
  },
  axisY : {
    crosshair: {
      enabled: true,
      color: "orange",
      labelFontColor: "#F8F8F8"
    },
    title: "Tax Amount",
    //valueFormatString:"0'%'"
  },
  axisX : {
    crosshair: {
      enabled: true,
      color: "blue",
      labelFontColor: "white"
    },
    title: "Income",
    minimum: 0
  },
  legend: {
    cursor: "pointer",
    horizontalAlign: "center",
    verticalAlign: "bottom",
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
      //toolTipContent: "{x}: {y} <span style='\"'color: {color}; font-weight: bold;'\";'>{name} </span>",
      name: "Total Tax",
      lineDashType: "solid",
      showInLegend: true,
      color: colors[0],
      //markerColor: "black",
      dataPoints: [
      ],
    },
    {
      type: 'line',
      //toolTipContent: "{x}: {y}" +unit_m + "<span style='\"'color: {color}; font-weight: bold;'\";'> {name} </span>",
      name: "Federal Income Tax",
      lineDashType: "line",
      showInLegend: true,
      color: colors[1],
      markerType: "circle",
      //markerColor: "blue",
      dataPoints: [
      ],
    },
    {
      type: 'line',
      //toolTipContent: "{x}: {y}" +unit_m + "<span style='\"'color: {color}; font-weight: bold;'\";'> {name} </span>",
      name: "Total Income Tax",
      lineDashType: "line",
      showInLegend: true,
      color: colors[2],
      markerType: "circle",
      //markerColor: "Brown",
      dataPoints: [
          {"x": 60000, "y":8000},
          {"x": 65000, "y":8200},
          {"x": 70000, "y":8500},
          {"x": 75000, "y":8500},
          {"x": 80000, "y":8600}
      ],
    },
    {
      type: 'line',
      //toolTipContent: "{x}: {y}" +unit_m + "<span style='\"'color: {color}; font-weight: bold;'\";'> {name} </span>",
      name: "Provincial Income Tax",
      lineDashType: "line",
      showInLegend: true,
      color: colors[3],
      markerType: "circle",
      //markerColor: "red",
      dataPoints: [
          {"x": 60000, "y":5000},
          {"x": 65000, "y":5200},
          {"x": 70000, "y":5500},
          {"x": 75000, "y":5500},
          {"x": 80000, "y":5500}
      ],
    },
    {
      type: 'line',
      //toolTipContent: "{x}: {y}" +unit_m + "<span style='\"'color: {color}; font-weight: bold;'\";'> {name} </span>",
      name: "CPP Contributions",
      lineDashType: "line",
      showInLegend: true,
      color: colors[4],
      markerType: "circle",
      //markerColor: "Brown",
      dataPoints: [
          {"x": 60000, "y":6000},
          {"x": 65000, "y":6200},
          {"x": 70000, "y":6500},
          {"x": 75000, "y":6500},
          {"x": 80000, "y":6600}
      ],
    },
    {
      type: 'line',
      //toolTipContent: "{x}: {y}" +unit_m + "<span style='\"'color: {color}; font-weight: bold;'\";'> {name} </span>",
      name: "Ei Premium",
      lineDashType: "line",
      showInLegend: true,
      markerType: "circle",
      color: colors[5],
      dataPoints: [
          {"x": 60000, "y":7000},
          {"x": 65000, "y":7200},
          {"x": 70000, "y":7500},
          {"x": 75000, "y":7500},
          {"x": 80000, "y":7600}
      ],
    }
  ]
};

export default options