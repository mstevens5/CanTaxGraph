import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

import chart_data from "./charts/data" 
import {fed_data, prov_data, provinces, years} from "./tax_data/init.js"

function App() {
  const options = chart_data
  console.log(years)
  console.log(provinces)


  return (
    <>
      <form>
        <select>
          {years.map((year) => <option key={year}>{year}</option>)}
        </select>
        <select>
          {provinces.map((prov) => <option key={prov}>{prov}</option>)}
        </select>
      </form>
      <div>
        <CanvasJSChart options={options} />
      </div>
    </>
  );
}

export default App
