import { useState, useEffect, useRef } from 'react'
import CanvasJSReact from '@canvasjs/react-charts';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

import chart_data from "./charts/data" 
import {provinces, years} from "./taxes/init"
import tax_calcs from "./taxes/calculations"
import PlotRecord from "./components/PlotRecord"

const load_chart_data = (is_percentage, year, salary, prov) => {
  let options
  if (is_percentage){
    options = chart_data.new_options("%")
  } else {
    options = chart_data.new_options("$")
    
  }
  //let options = Object.create(chart_data)
  const x_interval = Math.round(salary / 10)
  if (is_percentage){
    let plots = tax_calcs.get_tax_data(year, salary, prov, x_interval/100)
    options.data[0].dataPoints = plots.total_tax_percentage
    options.data[1].dataPoints = plots.total_income_tax_percentage
    options.data[2].dataPoints = plots.fed_income_tax_percentage
    options.data[3].dataPoints = plots.prov_income_tax_percentage
    options.data[4].dataPoints = plots.cpp_percentage
    options.data[5].dataPoints = plots.ei_percentage
  }
  else {
    let plots = tax_calcs.get_tax_data(year, salary, prov, x_interval/100)
    options.data[0].dataPoints = plots.total_tax
    options.data[1].dataPoints = plots.total_income_tax
    options.data[2].dataPoints = plots.fed_income_tax
    options.data[3].dataPoints = plots.prov_income_tax
    options.data[4].dataPoints = plots.cpp
    options.data[5].dataPoints = plots.ei
  }
  options.axisX.interval = x_interval
  return options
}


const TestComp = () => {
    return (
      <h1>Test</h1>
    )
  }
function App() {
  const [year, setYear] = useState('2013')
  const [prov, setProvince] = useState(provinces[0])
  const [salary, setSalary] = useState(100000)
  const [checked, setChecked] = useState(false)
  const [options, setOptions] = useState(Object.create(chart_data))
  const [test, setTest] = useState(true)

  useEffect(() => {
    plot_data(checked, year, salary, prov)
  }, [])

  //let salary = 350000
  const plot_data = (checked, year, salary, prov) => {
    console.log('Inside plot data')
    if (checked){
      setOptions(load_chart_data(true, year, salary, prov))
    }
    else {
      setOptions(load_chart_data(false, year, salary, prov))
    }
  }
  const yearChange = (event) => {
    setYear(event.target.value)
  }
  const provChange = (event) => {
    setProvince(event.target.value)  
  }
  const salaryChange = (event) => {
    event.preventDefault()
    setSalary(event.target.value)  
  }
  const checkChange = (event) => {
    setChecked(!checked)
  }
  const change_test = (event) => {
    setTest(!test)
  }

  /*const PlotRecord = ({current_year, years, change_year, provinces, change_prov,
    checked, change_check, salary, change_salary}) => {
      console.log('in plot')
    return (
      <form >
      <fieldset>
        <legend> First Plot</legend>
        <label>
          Salaray: 
          <input className="plot_option" name="salary_in" value={salary}
            onChange={change_salary}/>
        </label>
        <select className='plot_option' onChange={change_year} value={current_year}>
          {years.map((year) => <option key={year}>{year}</option>)}
        </select>
        <select className='plot_option' onChange={change_prov}>
          {provinces.map((prov) => <option key={prov}>{prov}</option>)}
        </select>
        <label>
          Percentage: 
          <input 
            type="checkbox" 
            checked={checked}
            onChange={change_check}
          />
        </label>
        <button onClick={() => plot_data(checked, year, salary, prov)}> Plot </button>
      </fieldset>
      </form>
    )
  }
  */
  // <fieldset>
  return (
    <>
        {/*
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
        */}
        <PlotRecord current_year={year} years={years} change_year={yearChange} 
          current_province={prov} provinces={provinces} change_prov={provChange}
          checked={checked} change_check={checkChange}
          salary={salary} change_salary={salaryChange}
          plot_data={plot_data}
          />
      <div className="plot">
        <CanvasJSChart options={options} />
      </div>
      <TestComp name="Mark"/>
    </>
  );
}

export default App
