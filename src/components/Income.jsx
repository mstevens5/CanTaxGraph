import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { set_primary_params, 
  set_secondary_params, 
  set_use_ratio} from '../reducers/plot_params'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {Tooltip, FormControl, OutlinedInput, TextField} from '@mui/material'
import icon from "../img/icons8-info-32.png"

const Income = () => {
  const dispatch = useDispatch()

  const income = useSelector(({plot_params}) => {
    return plot_params.primary.income
  })
  const handleSubmit = (event) => {
    event.preventDefault()
  }
  console.log('      INCOME IS ', income, typeof income)

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

  return (
    <div className="income_outline"> 
    <h2> Income </h2>
      <form onSubmit={handleSubmit}>
          <label>
            Max Income:
            <span style={{paddingRight:'15px'}}>
            <Tooltip
              title="This is the maximum income plotted on the graph"
              enterTouchDelay={0}
              slotProps={{
                tooltip:{
                  sx:{
                    fontStyle: 'bold',
                    fontSize: '0.75rem'
                  }
                }
              }}
              >
              <img src={icon} width="24" height="24"/>
            </Tooltip>
            </span>
            <TextField variant="outlined" size="small" value={income}
              onChange={change_income} />
          </label>
      </form>
    </div>
  )
}

export default Income