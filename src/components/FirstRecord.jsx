import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { set_primary_params, 
  set_secondary_params, 
  set_use_ratio} from '../reducers/plot_params'

const FirstRecord = ({years, provinces}) => {
  const dispatch = useDispatch()

  const {income, prov, year } = useSelector(({plot_params}) => {
    return plot_params.primary
  })
  const handleSubmit = (event) => {
    event.preventDefault()
  }
  console.log('INCOME IS ', income, typeof income)

  const change_income = (e) => {
    let temp = Number(e.target.value)
    console.log('!!!!!!! Change income')
    console.log('     Temp is ', temp, typeof temp)
    if (typeof temp != 'number' || temp < 0 || isNaN(temp)){
      console.log(' IF     Temp is ', temp, typeof temp)
      temp = 0
      e.target.value = "0"
    }
    dispatch(set_primary_params({income:e.target.value}))
  }
  const change_year = (e) => {
    dispatch(set_primary_params({year:e.target.value}))
  }
  const change_prov = (e) => {
    dispatch(set_primary_params({prov:e.target.value}))
  }

  return (
    <div> 
      <form onSubmit={handleSubmit}>
        <fieldset className="plot_info">
          <legend> First Plot</legend>
          <label>
            Max Income:
            <input className="plot_option" value={income}
              onChange={change_income} />
          </label>
          <select className='plot_option' onChange={change_year} value={year}>
            {years.map((year) => <option key={year}>{year}</option>)}
          </select>
          <select className='plot_option' onChange={change_prov} value={prov}>
            {provinces.map((prov) => <option key={prov}>{prov}</option>)}
          </select>
        </fieldset>
      </form>
    </div>
  )
}

export default FirstRecord