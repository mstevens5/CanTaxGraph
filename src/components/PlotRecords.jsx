//import plot_reducer, { set_primary_params } from '../reducers/plot_params'
import { memo, useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { set_primary_params, 
  set_secondary_params, 
  set_use_ratio} from '../reducers/plot_params'
import {load_primary_chart_data} from "../charts/data" 
import FirstRecord from "./FirstRecord"
import SecondRecord from "./SecondRecord"
import DisplayOptions from "./DisplayOptions"

function _PlotRecords({ years, provinces, set_options}){
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
  const chart_key = useSelector(({plot_params}) => {
    return plot_params.chart_key
  })
  const {total_tax,
    total_income_tax,
    fed_income_tax,
    prov_income_tax,
    cpp,
    ei } = useSelector(({plot_params}) => {return plot_params.display_options})

  // Anytime a plot parameter is changed, update plot options state
  useEffect(() => {
    plot_data()
  },[income, prov, year, use_ratio, enable_plot, year2, prov2, chart_key])

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
    let display_options = {total_tax,
    total_income_tax,
    fed_income_tax,
    prov_income_tax,
    cpp,
    ei }

    set_options(load_primary_chart_data(enable_plot, use_ratio, year, 
      income, prov, year2, prov2, display_options))
  }

  return (
    <div> 
      <FirstRecord years={years} provinces={provinces}/>
      <SecondRecord years={years} provinces={provinces}/>
      <DisplayOptions />
      {/*
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
    */}
    </div>
  )
}

const PlotRecords = memo(_PlotRecords)
export default PlotRecords