import { useState, useEffect, useRef } from 'react'
import CanvasJSReact from '@canvasjs/react-charts';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

import chart_data from "./charts/data" 
import {provinces, years} from "./taxes/init"
import tax_calcs from "./taxes/calculations"

function App() {
  const [year, setYear] = useState('2013')
  const [prov, setProvince] = useState(provinces[0])
  const [checked, setChecked] = useState(false)
  let options
  options = Object.create(chart_data)

  let salary = 300000
  if (checked){
    options.data[0].dataPoints = tax_calcs.get_fed_data(year, salary).percentage
    options.data[1].dataPoints = tax_calcs.get_fed_data(year, salary).cpp_percentage
  }
  else {
    options.data[0].dataPoints = tax_calcs.get_fed_data(year, salary).income_tax
    console.log(tax_calcs.get_fed_data(year, salary).income_tax)
    options.data[1].dataPoints = tax_calcs.get_fed_data(year, salary).cpp
    options.data[2].dataPoints = tax_calcs.get_prov_data(year, salary,prov).income_tax
  }

  const yearChange = (event) => {
    setYear(event.target.value)
  }
  const provChange = (event) => {
    setProvince(event.target.value)  
  }
  const checkChange = (event) => {
    setChecked(!checked)
  }
  // <fieldset>
  return (
    <>
      <form>
        <select onChange={yearChange}>
          {years.map((year) => <option key={year}>{year}</option>)}
        </select>
        <select onChange={provChange}>
          {provinces.map((prov) => <option key={prov}>{prov}</option>)}
        </select>
        <label>
          Percentage: 
          <input 
            type="checkbox" 
            checked={checked}
            onChange={checkChange}
          />
        </label>
      </form>
      <div>
        <CanvasJSChart options={options} />
      </div>
    </>
  );
}

export default App
