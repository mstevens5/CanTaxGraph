import { useState, useEffect, useRef } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import CanvasJSReact from '@canvasjs/react-charts';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

import chart_data from "./charts/data" 
import {provinces, years} from "./taxes/init"
import PlotRecords from "./components/PlotRecords"
import { set_primary_params } from './reducers/plot_params';

function App() {
  /*const [year, setYear] = useState('2013')
  const [prov, setProvince] = useState(provinces[0])
  const [salary, setSalary] = useState(100000)
  const [checked, setChecked] = useState(false)*/
  const [options, setOptions] = useState(chart_data.new_options())
  const dispatch = useDispatch()
  const chart_key = useSelector(({plot_params}) => {
    return plot_params.chart_key
  })
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
  return (
    <div className='base'>
      <PlotRecords years={years} 
        provinces={provinces}
        set_options = {setOptions}
        />
      <div className="plot">
        {console.log('plots before', options)}
        <CanvasJSChart options={options} key={chart_key} />
      </div>
    </div>
  );
}

export default App
