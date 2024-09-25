var unit_m = "$"
let colors = ["#000000", //black
  "#ff00ff", // blue
  "#00bfff", // deepskyblue
  "darkgreen", // dodgerblue
  "#ffa500", // orange
  "red"
] // darkcyan 

const new_options = (unit="$") => {
  unit_m = unit
  return Object.create(options)
}

const options = {
  theme: 'light2',
  toolTip: {
    shared: true,
    contentFormatter: function (e) {
      var content = "";

      e.entries.sort(function(a,b) {
        return b.dataPoint.y - a.dataPoint.y;
      });

      content += "<div style=\"text-align: center\">";
      content += "<h3 style=\"margin: 0\">"
      content	+= "<span style=\"font-weight: bold\"> Income: $" + e.entries[0].dataPoint.x.toLocaleString() + "</span>";
      content += "<br/>";
      content += "</h3>"
      content += "</div>";
      content += "<hr>"

      var entries = e.entries;
      for(var j = 0; j < entries.length; j++) {
        content	+= "<div style=\"text-align:right\">";
        content	+= "<span style=\"color:" + entries[j].dataSeries.color+"\"\>" + entries[j].dataSeries.name + " </span>: " + "<strong>" + unit_m + Number(entries[j].dataPoint.y.toFixed(2)).toLocaleString() + "</strong>";
        content += "<br/></div>"; 
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
    labelFontWeight: "bold",
    interlacedColor: "#f8f8f8",
    title: "Tax Amount",
    minimum: 0,
    labelFormatter: function(e){
      return unit_m + e.value.toLocaleString()
    },
    //valueFormatString:"'$'0"
  },
  axisX : {
    crosshair: {
      enabled: true,
      color: "blue",
      labelFontColor: "white"
    },
    title: "Income",
    gridThickness: 1,
    minimum: 0
    //maximum: 0
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
      name: "Total Income Tax",
      lineDashType: "line",
      showInLegend: true,
      color: colors[1],
      markerType: "circle",
      //markerColor: "blue",
      visible: false,
      dataPoints: [
      ],
    },
    {
      type: 'line',
      //toolTipContent: "{x}: {y}" +unit_m + "<span style='\"'color: {color}; font-weight: bold;'\";'> {name} </span>",
      name: "Federal Income Tax",
      lineDashType: "line",
      showInLegend: true,
      color: colors[2],
      markerType: "circle",
      //markerColor: "Brown",
      visible: false,
      showInLegend: true,
      dataPoints: [
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
      visible: false,
      dataPoints: [
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
      visible: false,
      dataPoints: [
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
      visible: false,
      dataPoints: [
      ],
    },
    {
      type: 'line',
      //toolTipContent: "{x}: {y} <span style='\"'color: {color}; font-weight: bold;'\";'>{name} </span>",
      name: "Total Tax",
      lineDashType: "dot",
      showInLegend: true,
      color: colors[0],
      //markerColor: "black",
      dataPoints: [
      ],
    },
    {
      type: 'line',
      //toolTipContent: "{x}: {y}" +unit_m + "<span style='\"'color: {color}; font-weight: bold;'\";'> {name} </span>",
      name: "Total Income Tax",
      lineDashType: "dot",
      showInLegend: true,
      color: colors[1],
      markerType: "circle",
      //markerColor: "blue",
      visible: false,
      dataPoints: [
      ],
    },
    {
      type: 'line',
      //toolTipContent: "{x}: {y}" +unit_m + "<span style='\"'color: {color}; font-weight: bold;'\";'> {name} </span>",
      name: "Federal Income Tax",
      lineDashType: "dot",
      showInLegend: true,
      color: colors[2],
      markerType: "circle",
      //markerColor: "Brown",
      visible: false,
      showInLegend: true,
      dataPoints: [
      ],
    },
    {
      type: 'line',
      //toolTipContent: "{x}: {y}" +unit_m + "<span style='\"'color: {color}; font-weight: bold;'\";'> {name} </span>",
      name: "Provincial Income Tax",
      lineDashType: "dot",
      showInLegend: true,
      color: colors[3],
      markerType: "circle",
      //markerColor: "red",
      visible: false,
      dataPoints: [
      ],
    },
    {
      type: 'line',
      //toolTipContent: "{x}: {y}" +unit_m + "<span style='\"'color: {color}; font-weight: bold;'\";'> {name} </span>",
      name: "CPP Contributions",
      lineDashType: "dot",
      showInLegend: true,
      color: colors[4],
      markerType: "circle",
      //markerColor: "Brown",
      visible: false,
      dataPoints: [
      ],
    },
    {
      type: 'line',
      //toolTipContent: "{x}: {y}" +unit_m + "<span style='\"'color: {color}; font-weight: bold;'\";'> {name} </span>",
      name: "Ei Premium",
      lineDashType: "dot",
      showInLegend: true,
      markerType: "circle",
      color: colors[5],
      visible: false,
      dataPoints: [
        {x:30000,y:4000},
        {x:35000,y:4000}
      ],
    }
  ]
};

export default {new_options}