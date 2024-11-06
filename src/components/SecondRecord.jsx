import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { set_primary_params, 
  set_secondary_params, 
  set_use_ratio, 
  set_enable_second_plot} from '../reducers/plot_params'

const SecondRecord = ({years, provinces}) => {
  const dispatch = useDispatch()

  const {prov2, year2 } = useSelector(({plot_params}) => {
    return plot_params.secondary
  })
  const enable_plot = useSelector(({plot_params}) => {
    return plot_params.enable_second_plot
  })
  const handleSubmit = (event) => {
    event.preventDefault()
  }
  const change_year2 = (e) => {
    dispatch(set_secondary_params({year2:e.target.value}))
  }
  const change_prov2 = (e) => {
    dispatch(set_secondary_params({prov2:e.target.value}))
  }
  const change_enable_plot = (e) => {
    dispatch(set_enable_second_plot(e.target.checked))
  }

  return (
    <div> 
      <form onSubmit={handleSubmit}>
        <fieldset >
          <legend> Second Plot</legend>
          <select className='plot_option' onChange={change_year2} value={year2}>
            {years.map((year) => <option key={year}>{year}</option>)}
          </select>
          <select className='plot_option' onChange={change_prov2} value={prov2}>
            {provinces.map((prov) => <option key={prov}>{prov}</option>)}
          </select>
          <label>
            Enable:
            <input
              type="checkbox"
              checked={enable_plot}
              onChange={change_enable_plot}
            />
          </label>
        </fieldset>
      </form>
    </div>
  )
}

export default SecondRecord