// unit_m is the unit of measurement for the y axis ticks and tooltip info.
import tax_calcs from "../taxes/calculations"
var unit_m = "$"

let colors = ["#000000", //black
  "#ff00ff", // blue
  "#00bfff", // deepskyblue
  "darkgreen", // dodgerblue
  "#ffa500", // orange
  "red"
] // darkcyan 


// This object is designed to be passed to CanvasJSChart component. It contains
// everything needed for displaying the plots we construct in our app.
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
        content	+= "<div style=\"text-align:left\">";
        content	+= "<span style=\"color:" + entries[j].dataSeries.color+"\"\>" + entries[j].dataSeries.name + " </span>: " + "<strong>" 
        if (unit_m == "$"){
          content += unit_m + Number(entries[j].dataPoint.y.toFixed(2)).toLocaleString()
        }
        else {
          content += Number(entries[j].dataPoint.y.toFixed(2)).toLocaleString() + unit_m
        }
        content += "</strong>";
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
      if (unit_m == "$"){
        return unit_m + e.value.toLocaleString()
      }
      else{
        return e.value.toLocaleString() + unit_m
      }
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
  legend:{
    //horizontalAlign: "left",
    //verticalAlign: "center"
  },
  /*
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
  */
  data: [
    {
      type: 'line',
      //toolTipContent: "{x}: {y} <span style='\"'color: {color}; font-weight: bold;'\";'>{name} </span>",
      name: "Total Tax",
      lineDashType: "solid",
      showInLegend: true,
      color: colors[0],
      markerType: "circle",
      visible:true,
      //markerColor: "black",
      //click: function(e){ 
      //  alert(  e.dataSeries.type+ " x:" + e.dataPoint.x + ", y: "+ e.dataPoint.y);
      //},
      dataPoints: [
        {x:0,y:0}
      ]
    },
    {
      type: 'line',
      //toolTipContent: "{x}: {y}" +unit_m + "<span style='\"'color: {color}; font-weight: bold;'\";'> {name} </span>",
      name: "Total Income Tax",
      lineDashType: "solid",
      showInLegend: true,
      color: colors[1],
      markerType: "circle",
      //markerColor: "blue",
      visible: true,
      dataPoints: [
        {x:0,y:0}
      ],
    },
    {
      type: 'line',
      //toolTipContent: "{x}: {y}" +unit_m + "<span style='\"'color: {color}; font-weight: bold;'\";'> {name} </span>",
      name: "Federal Income Tax",
      lineDashType: "solid",
      showInLegend: true,
      color: colors[2],
      markerType: "circle",
      //markerColor: "Brown",
      visible: true,
      showInLegend: true,
      dataPoints: [
        {x:0,y:0}
      ],
    },
    {
      type: 'line',
      //toolTipContent: "{x}: {y}" +unit_m + "<span style='\"'color: {color}; font-weight: bold;'\";'> {name} </span>",
      name: "Provincial Income Tax",
      lineDashType: "solid",
      showInLegend: true,
      color: colors[3],
      markerType: "circle",
      //markerColor: "red",
      visible: true,
      dataPoints: [
        {x:0,y:0}
      ],
    },
    {
      type: 'line',
      //toolTipContent: "{x}: {y}" +unit_m + "<span style='\"'color: {color}; font-weight: bold;'\";'> {name} </span>",
      name: "CPP Contributions",
      lineDashType: "solid",
      showInLegend: true,
      color: colors[4],
      markerType: "circle",
      //markerColor: "Brown",
      visible: true,
      dataPoints: [
        {x:0,y:0}
      ],
    },
    {
      type: 'line',
      //toolTipContent: "{x}: {y}" +unit_m + "<span style='\"'color: {color}; font-weight: bold;'\";'> {name} </span>",
      name: "Ei Premium",
      lineDashType: "solid",
      showInLegend: true,
      markerType: "circle",
      color: colors[5],
      visible: true,
      dataPoints: [
        {x:0,y:0}
      ],
    },
    {
      type: 'line',
      //toolTipContent: "{x}: {y} <span style='\"'color: {color}; font-weight: bold;'\";'>{name} </span>",
      name: "Total Tax 2",
      lineDashType: "dot",
      showInLegend: false,
      visible: false,
      color: colors[0],
      //markerColor: "black",
      dataPoints: [
        {x:0,y:0}
      ],
    },
    {
      type: 'line',
      //toolTipContent: "{x}: {y}" +unit_m + "<span style='\"'color: {color}; font-weight: bold;'\";'> {name} </span>",
      name: "Total Income Tax 2",
      lineDashType: "dot",
      showInLegend: false,
      color: colors[1],
      markerType: "circle",
      //markerColor: "blue",
      visible: false,
      dataPoints: [
        {x:0,y:0}
      ],
    },
    {
      type: 'line',
      //toolTipContent: "{x}: {y}" +unit_m + "<span style='\"'color: {color}; font-weight: bold;'\";'> {name} </span>",
      name: "Federal Income Tax 2",
      lineDashType: "dot",
      showInLegend: false,
      color: colors[2],
      markerType: "circle",
      //markerColor: "Brown",
      visible: false,
      dataPoints: [
        {x:0,y:0}
      ],
    },
    {
      type: 'line',
      //toolTipContent: "{x}: {y}" +unit_m + "<span style='\"'color: {color}; font-weight: bold;'\";'> {name} </span>",
      name: "Provincial Income Tax 2",
      lineDashType: "dot",
      showInLegend: false,
      color: colors[3],
      markerType: "circle",
      //markerColor: "red",
      visible: false,
      dataPoints: [
        {x:0,y:0}
      ],
    },
    {
      type: 'line',
      //toolTipContent: "{x}: {y}" +unit_m + "<span style='\"'color: {color}; font-weight: bold;'\";'> {name} </span>",
      name: "CPP Contributions 2",
      lineDashType: "dot",
      showInLegend: false,
      color: colors[4],
      markerType: "circle",
      //markerColor: "Brown",
      visible: false,
      dataPoints: [
        {x:0,y:0}
      ],
    },
    {
      type: 'line',
      //toolTipContent: "{x}: {y}" +unit_m + "<span style='\"'color: {color}; font-weight: bold;'\";'> {name} </span>",
      name: "Ei Premium 2",
      lineDashType: "dot",
      showInLegend: false,
      markerType: "circle",
      color: colors[5],
      visible: false,
      dataPoints: [
        {x:0,y:0}
      ],
    }
  ]
};

const new_options = (unit="$") => {
  unit_m = unit
  return Object.create(options)
}

const set_visibility = (display_options, enable) => {
  if (display_options.total_tax){
    options.data[0].visible = true
    if (enable)
      options.data[6].visible = true
  }
  if (!display_options.total_tax){
    console.log('Did were get here?????')
    options.data[0].visible = false
    options.data[6].visible = false
    console.log('hhhhhhhhhhh', options)
  }

  if (display_options.total_income_tax){
    options.data[1].visible = true
    if (enable)
      options.data[7].visible = true
  }
  if (!display_options.total_income_tax){
    options.data[1].visible = false
    options.data[7].visible = false
  }

  if (display_options.fed_income_tax){
    options.data[2].visible = true
    if (enable)
      options.data[8].visible = true
  }
  if (!display_options.fed_income_tax){
    options.data[2].visible = false
    options.data[8].visible = false
  }

  if (display_options.prov_income_tax){
    options.data[3].visible = true
    if (enable)
      options.data[9].visible = true
  }
  if (!display_options.prov_income_tax){
    options.data[3].visible = false
    options.data[9].visible = false
  }
  
  if (display_options.cpp){
    options.data[4].visible = true
    if (enable)
      options.data[10].visible = true
  }
  if (!display_options.cpp){
    options.data[4].visible = false
    options.data[10].visible = false
  }

  if (display_options.ei){
    options.data[5].visible = true
    if (enable)
      options.data[11].visible = true
  }
  if (!display_options.ei){
    options.data[5].visible = false
    options.data[11].visible = false
  }
  console.log('sadlkfjasl;dkfjas;dlfj;asdlf', options)
}

const load_primary_chart_data = (enable_plot, use_ratio, year, income, prov, 
  year2, prov2, display_options) => {

  let options
  if (use_ratio){
    options = new_options("%")
  } else {
    options = new_options("$")
    
  } 

  let x_axis_interval = Math.round(income / 10)
  if (x_axis_interval == 0){
    x_axis_interval = income / 10
  }
  options.axisX.interval = x_axis_interval

  let x_tick_interval = x_axis_interval / 100

  if (use_ratio){
    let plots = tax_calcs.get_tax_data(year, income, prov, x_tick_interval)
    options.data[0].dataPoints = plots.total_tax_percentage
    options.data[1].dataPoints = plots.total_income_tax_percentage
    options.data[2].dataPoints = plots.fed_income_tax_percentage
    options.data[3].dataPoints = plots.prov_income_tax_percentage
    options.data[4].dataPoints = plots.cpp_percentage
    options.data[5].dataPoints = plots.ei_percentage
    plots = tax_calcs.get_tax_data(year2, income, prov2, x_tick_interval)
    options.data[6].dataPoints = plots.total_tax_percentage
    options.data[7].dataPoints = plots.total_income_tax_percentage
    options.data[8].dataPoints = plots.fed_income_tax_percentage
    options.data[9].dataPoints = plots.prov_income_tax_percentage
    options.data[10].dataPoints = plots.cpp_percentage
    options.data[11].dataPoints = plots.ei_percentage
  }
  if (!use_ratio){
    let plots = tax_calcs.get_tax_data(year, income, prov, x_tick_interval)
    options.data[0].dataPoints = plots.total_tax
    options.data[1].dataPoints = plots.total_income_tax
    options.data[2].dataPoints = plots.fed_income_tax
    options.data[3].dataPoints = plots.prov_income_tax
    options.data[4].dataPoints = plots.cpp
    options.data[5].dataPoints = plots.ei
    plots = tax_calcs.get_tax_data(year2, income, prov2, x_tick_interval)
    options.data[6].dataPoints = plots.total_tax
    options.data[7].dataPoints = plots.total_income_tax
    options.data[8].dataPoints = plots.fed_income_tax
    options.data[9].dataPoints = plots.prov_income_tax
    options.data[10].dataPoints = plots.cpp
    options.data[11].dataPoints = plots.ei
  }

  // Edge case so that even when income is 0 the plot has one datapoint
  if (income <= 0){
    for (let i = 0; i < options.data.length; i++){
      options.data[i].dataPoints = [{x:0,y:0}]
    }
  }

  // Change visibility for second plot.
  for (let i = 6; i < options.data.length; i++){
    let visibility = false
    if (enable_plot){
      visibility = true
    }
    options.data[i].visible = visibility
  }

  set_visibility(display_options, enable_plot)

  // This is a hack while use_ratio is enabled and x = 0. Change y to 0.
  for (let i = 0; i < options.data.length; i++){
    if (isNaN(options.data[i].dataPoints[0].y)){
      options.data[i].dataPoints[0].y = 0
    }
  }

  return options
}

export {load_primary_chart_data}
export default {new_options, set_visibility}