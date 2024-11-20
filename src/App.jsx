import { useState, useEffect, useRef } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import CanvasJSReact from '@canvasjs/react-charts';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

import chart_data from "./charts/data" 
import {provinces, years} from "./taxes/init"
import PlotRecords from "./components/PlotRecords"
import CalculationDescription from "./components/CalculationDescription";
import { set_primary_params } from './reducers/plot_params';

import {FormGroup, FormControlLabel, Switch} from '@mui/material'

function App() {
  /*const [year, setYear] = useState('2013')
  const [prov, setProvince] = useState(provinces[0])
  const [salary, setSalary] = useState(100000)
  const [checked, setChecked] = useState(false)*/
  const [options, setOptions] = useState(chart_data.options)
  const [switch_checked, set_checked] = useState(false); 
  const dispatch = useDispatch()
  //const chart_key = useSelector(({plot_params}) => {
  //  return plot_params.chart_key
  //})
  /*
  const display_options = useSelector(({plot_params}) => {
    return plot_params.display_options
  })*/

  /*useEffect(()=> {
    console.log(' .                data', options)
    chart_data.set_visibility(display_options)
  }, [chart_key]);
  console.log('Options in app', options)*/

  /*
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
    console.log('Inside CheckChange')
    setChecked(!checked)
  }*/
  console.log('Inside APP before return')
  return (
    <div >
      <div className="title_container">
        <div className="title"> Canadian Tax Graph</div>
        <div className="title_description"> 
          More than a calculator, Canadian Tax Graph displays basic tax 
          information in an easy to view and compare line chart.
        </div>
        <br/>
        <div>
          The purpose of this tool is to show taxes owed for single tax payers
          under the age of 65 who earn their income from employment rather than 
          capital gains, dividends, etc
        </div>
        <hr className="title_rule"/>
      </div>
      <div className="plot">
        {console.log('plots before', options)}
        <CanvasJSChart options={options} />
      </div>
      <PlotRecords years={years} 
        provinces={provinces}
        set_options = {setOptions}
        />
      <hr/>
      <CalculationDescription/>
    </div>
  );
}

export default App
