import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { set_primary_params, 
  set_secondary_params, 
  set_use_ratio} from '../reducers/plot_params'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {FormControl, OutlinedInput} from '@mui/material'
import {Accordion, 
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@mui/material'

import { get_fed_details } from '../taxes/init';
import ArrowDownwardIcon from "../img/arrow_downward_icon.png"
import { fed_data as fed, prov_data } from "../taxes/init"

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

  const fed_details = get_fed_details(year)

  return (
    <div className="plot_params"> 
            <div className="plot_param_title"> Primary Plot</div>
            <div className="plot_param_container">
              <div className="plot_param_item">
                <form onSubmit={handleSubmit}>
                  <span className="plot_param_label">Tax Year:</span> 
                  <Select size="small" onChange={change_year} value={year} >
                    {years.map((year) => <MenuItem key={year} value={year}>{year}</MenuItem>)}
                  </Select>
                </form>
              </div>
              <div className="plot_param_item">
                <form onSubmit={handleSubmit}>
                <span className="plot_param_label">Province:</span> 
                  <Select size="small" onChange={change_prov} value={prov} >
                    {provinces.map((prov) => <MenuItem key={prov} value={prov}>{prov}</MenuItem>)}
                  </Select>
                </form>
              </div>
            </div>
    </div>
  )
}

export default FirstRecord



/*
    <div> 
      <Accordion sx={{boxShadow:0}} defaultExpanded>
        <AccordionSummary
          expandIcon={<img src={ArrowDownwardIcon} width="24rem" height="24rem"/>}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component={'span'} sx={{width:'100%'}}>
            <div className="plot_param_title"> Primary Plot</div>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={'span'} >
            <form onSubmit={handleSubmit}>
              <div className="plot_param_container">
                <div className="plot_param_item">
                  <span className="plot_param_label">Tax Year:</span> 
                  <Select size="small" onChange={change_year} value={year} >
                    {years.map((year) => <MenuItem key={year} value={year}>{year}</MenuItem>)}
                  </Select>
                </div>
                <div className="plot_param_item">
                  <span className="plot_param_label">Province:</span> 
                  <Select size="small" onChange={change_prov} value={prov} >
                    {provinces.map((prov) => <MenuItem key={prov} value={prov}>{prov}</MenuItem>)}
                  </Select>
                </div>
              </div>
            </form>

            <div style={{fontWeight:900}}>
              <ul>
                <li>
                  Show Year/Province Details
                </li>
              </ul>
            </div>
            
            <Accordion>
              <AccordionSummary
                expandIcon={<img src={ArrowDownwardIcon} width="24rem" height="24rem"/>}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography component={'span'}>
                  <div> EI</div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography component={'span'} >
                  <div>
                      Rate: {fed_details.ei.rate}
                  </div>
                  <div>
                      Maximum Premium: {fed_details.ei.max_premium}
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>


            <Accordion>
              <AccordionSummary
                expandIcon={<img src={ArrowDownwardIcon} width="24rem" height="24rem"/>}
                aria-controls="panel3-content"
                id="panel3-header"
              >
                <Typography component={'span'}>
                  <div> CPP</div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography component={'span'} >
                  <div>
                      Rate: {fed_details.cpp.rate}
                  </div>
                  <div>
                      Exemption: {fed_details.cpp.exemption}
                  </div>
                  <div>
                      Max Contributions: {fed_details.cpp.max_contrib}
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
    */