import plot_reducer, { set_primary_params } from '../reducers/plot_params'
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector} from 'react-redux'

const PlotRecord = ({ current_year, years, change_year, provinces, change_prov,
    current_province, checked, change_check, salary, change_salary, plot_data }) => {
  const [test, setTest] = useState(true)
  const primary_params = useSelector(({plot_params}) => {
    return plot_params.primary
  })

  const change_test = (event) => {
    setTest(!test)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
  }
  return (
    <><form onSubmit={handleSubmit}>
      <fieldset className="plot_info">
        <legend> First Plot</legend>
        <label>
          Max Income:
          <input className="plot_option" name="salary_in" value={salary}
            onChange={change_salary} />
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
        <button onClick={ () => {
          plot_data(checked, current_year, salary, current_province)}}> 
          Plot 
        </button>
      </fieldset>
      </form>
      <div>
        <label>
          Test:
          <input
            type="checkbox"
            checked={test}
            onChange={change_test}
          />
        </label>
      </div>
    </>
  )
}

export default PlotRecord