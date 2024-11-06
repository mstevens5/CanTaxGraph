import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import {
    set_use_ratio,
    set_display_options
} from '../reducers/plot_params'
import chart_data from '../charts/data'

const DisplayOptions = () => {
  const dispatch = useDispatch()

  const use_ratio = useSelector(({plot_params}) => {
    return plot_params.use_ratio
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

  console.log('total tax ', total_tax)
  const handleSubmit = (event) => {
    event.preventDefault()
  }

  // Functions for changing general plot params
  const change_use_ratio = (e) => {
    dispatch(set_use_ratio(e.target.checked))
  }
  const toggle_total_tax = (e) => {
    //display_options.total_tax = e.target.checked
    dispatch(set_display_options({total_tax:e.target.checked}))
    //chart_data.set_visibility(display_options)
  }
  const toggle_total_income_tax = (e) => {
    dispatch(set_display_options({total_income_tax:e.target.checked}))
    chart_data.set_visibility({total_income_tax:e.target.checked})
  }
  const toggle_fed_income_tax = (e) => {
    dispatch(set_display_options({fed_income_tax:e.target.checked}))
    chart_data.set_visibility({fed_income_tax:e.target.checked})
  }
  const toggle_prov_income_tax = (e) => {
    dispatch(set_display_options({prov_income_tax:e.target.checked}))
    chart_data.set_visibility({prov_income_tax:e.target.checked})
  }
  const toggle_cpp   = (e) => {
    dispatch(set_display_options({cpp:e.target.checked}))
    chart_data.set_visibility({cpp:e.target.checked})
  }
  const toggle_ei = (e) => {
    dispatch(set_display_options({ei:e.target.checked}))
    chart_data.set_visibility({ei:e.target.checked})
  }
   return (
      <form onSubmit={handleSubmit}>
        Display Options
        <ul>
          <li>
        <label>
          Ratio:
          <input
            type="checkbox"
            checked={use_ratio}
            onChange={change_use_ratio}
          />
        </label>
        </li>
        <li>
        <label>
          Total Tax:
          <input
            type="checkbox"
            checked={total_tax}
            onChange={toggle_total_tax}
          />
        </label>
        </li>
        <li>
        <label>
          Total Income Tax:
          <input
            type="checkbox"
            checked={total_income_tax}
            onChange={toggle_total_income_tax}
          />
        </label>
        </li>
        </ul>
      </form>
   ) 
}

export default DisplayOptions