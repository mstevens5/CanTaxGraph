//import plot_reducer, { set_primary_params } from '../reducers/plot_params'
import { memo, useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { set_primary_params, 
  set_secondary_params, 
  set_use_ratio} from '../reducers/plot_params'
import {load_primary_chart_data} from "../charts/data" 
import chart_data from "../charts/data" 
import FirstRecord from "./FirstRecord"
import SecondRecord from "./SecondRecord"
import DisplayOptions from "./DisplayOptions"
import Income from "./Income"
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import {TabContext, TabList, TabPanel} from '@mui/lab';

function _PlotRecords({ years, provinces, set_options}){
  const [value, setValue] = useState('1');
  const dispatch = useDispatch()

  const {income, prov, year } = useSelector(({plot_params}) => {
    return plot_params.primary
  })
  const {prov2, year2 } = useSelector(({plot_params}) => {
    return plot_params.secondary
  })
  const use_ratio = useSelector(({plot_params}) => {
    return plot_params.use_ratio
  })
  const enable_plot = useSelector(({plot_params}) => {
    return plot_params.enable_second_plot
  })
  const {total_tax,
    total_income_tax,
    fed_income_tax,
    prov_income_tax,
    cpp,
    ei } = useSelector(({plot_params}) => {return plot_params.display_options})
  
  let display_options = {total_tax,
    total_income_tax,
    fed_income_tax,
    prov_income_tax,
    cpp,
    ei }

  // Anytime a plot parameter is changed, update plot options state
  useEffect(() => {
    console.log('First useEffect plot_Data')
    plot_data()
  },[income, prov, year, use_ratio, year2, prov2])

  useEffect(() => {
    console.log('Second useEffect change chart visuals')
    chart_data.change_chart_visuals(enable_plot, display_options)
    chart_data.update_title(year, prov, year2, prov2, enable_plot)
    set_options(Object.create(chart_data.options))
    })

  console.log(' Beginning of PlotRecords')

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  const change_year2 = (e) => {
    dispatch(set_secondary_params({year2:e.target.value}))
  }
  const change_prov2 = (e) => {
    dispatch(set_secondary_params({prov2:e.target.value}))
  }
  const plot_data = ( ) => {
    load_primary_chart_data(enable_plot, use_ratio, year, 
      income, prov, year2, prov2)
    set_options(Object.create(chart_data.options))
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="plot_records"> 

      <div className="income_outline"> 
        <Income />
      </div>
      <FirstRecord years={years} provinces={provinces}/>
      <div className="plot_params">
        <SecondRecord years={years} provinces={provinces} set_options={set_options}/>
      </div>
      <div className="display_options_outline">
        <DisplayOptions />
      </div>
    </div>
  )
}

const PlotRecords = memo(_PlotRecords)
export default PlotRecords

      /*
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="First Plot" value="1" />
            <Tab label="Second Plot" value="2" />
            <Tab label="Options" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <FirstRecord years={years} provinces={provinces}/>
        </TabPanel>
        <TabPanel value="2">
          <SecondRecord years={years} provinces={provinces} set_options={set_options}/>
        </TabPanel>
        <TabPanel value="3">
          <DisplayOptions />
        </TabPanel>
      </TabContext>
      */

      /*
      <form onSubmit={handleSubmit}>
        <label>
          Percentage:
          <input
            type="checkbox"
            checked={use_ratio}
            onChange={change_check}
          />
        </label>
      </form>
    */