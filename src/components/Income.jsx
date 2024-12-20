import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  set_primary_params,
  set_secondary_params,
  set_use_ratio
} from '../reducers/plot_params'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Tooltip, FormControl, OutlinedInput, TextField } from '@mui/material'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@mui/material'
import { FormControlLabel } from '@mui/material';
import Checkbox from "@mui/material/Checkbox";

import ArrowDownwardIcon from "../img/arrow_downward_icon.png"
import icon from "../img/icons8-info-32_2.png"

const Income = () => {
  const dispatch = useDispatch()

  const use_ratio = useSelector(({ plot_params }) => {
    return plot_params.use_ratio
  })
  const income = useSelector(({ plot_params }) => {
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
    if (typeof temp != 'number' || temp < 0 || isNaN(temp)) {
      console.log(' IF     Temp is ', temp, typeof temp)
      temp = 0
      e.target.value = "0"
    }
    dispatch(set_primary_params({ income: e.target.value }))
  }

  const change_use_ratio = (e) => {
    dispatch(set_use_ratio(e.target.checked))
  }

  return (
    <div>
      <div className="income_title">Income</div>
      <form onSubmit={handleSubmit}>
        <div className="income_container">
          <div className="income_item">
            <label>
              Max Taxable Income:
              <span>
                <Tooltip
                  title="This is the maximum taxable income plotted on the graph."
                  enterTouchDelay={0}
                  slotProps={{
                    tooltip: {
                      sx: {
                        fontStyle: 'bold',
                        fontSize: '0.75rem'
                      }
                    }
                  }}
                >
                  <img style={{ marginBottom: '0rem' }} src={icon} width="20rem" height="20rem" />
                </Tooltip>
              </span>
              <TextField variant="outlined" size="small" value={income}
                onChange={change_income} />
            </label>
          </div>
          <div className="income_item">
            <label>
                <Checkbox checked={use_ratio} onChange={change_use_ratio}
              />
              Use Ratio <sup>1</sup>
              </label>
          </div>
          <div className="income_item">
              <span className="ratio_description">
                1. Display taxes as a percentage of total income
              </span>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Income


/*
    <div> 
      <Accordion sx={{boxShadow:0}} defaultExpanded>
        <AccordionSummary
          expandIcon={<img src={ArrowDownwardIcon} width="24rem" height="24rem"/>}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component={'span'} sx={{width:'100%'}}>
            <div className="income_title">Income</div>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={'span'} >
            <form onSubmit={handleSubmit}>
              <label>
                Max Taxable Income:
                <span style={{paddingRight:'15px'}}>
                <Tooltip
                  title="This is the maximum taxable income plotted on the graph."
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
                  <img src={icon} width="24rem" height="24rem"/>
                </Tooltip>
                </span>
                <br />
                <TextField variant="outlined" size="small" value={income}
                  onChange={change_income} />
              </label>
            </form>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
    */