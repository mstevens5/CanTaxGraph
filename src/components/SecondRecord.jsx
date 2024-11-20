import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  set_primary_params,
  set_secondary_params,
  set_use_ratio,
  set_enable_second_plot
} from '../reducers/plot_params'
import chart_data from '../charts/data'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FormGroup, FormControlLabel, Switch } from '@mui/material'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@mui/material'

import ArrowDownwardIcon from "../img/arrow_downward_icon.png"

const SecondRecord = ({ years, provinces }) => {
  const dispatch = useDispatch()

  const { prov2, year2 } = useSelector(({ plot_params }) => {
    return plot_params.secondary
  })
  const enable_plot = useSelector(({ plot_params }) => {
    return plot_params.enable_second_plot
  })

  const handleSubmit = (event) => {
    event.preventDefault()
  }
  const change_year2 = (e) => {
    dispatch(set_secondary_params({ year2: e.target.value }))
  }
  const change_prov2 = (e) => {
    dispatch(set_secondary_params({ prov2: e.target.value }))
  }
  const change_enable_plot = (e) => {
    dispatch(set_enable_second_plot(e.target.checked))
  }

  console.log('Inside Second Record')
  return (
    <div>
      <div className="plot_param_title"> Secondary Plot</div>
      <div className="plot_param_title_description">
        These will be displayed as dotted lines in the chart
      </div>
      <div className="plot_param_container">
        <div className="plot_param_item" >
          <form onSubmit={handleSubmit}>
            <span className="plot_param_label" >Tax Year:</span>
            <Select size="small" onChange={change_year2} value={year2}>
              {years.map((year) =>
                <MenuItem key={year} value={year}>{year}</MenuItem>)}
            </Select>
          </form>
        </div>
        <div className="plot_param_item" >
          <form onSubmit={handleSubmit}>
            <span className="plot_param_label" >Province:</span>
            <Select size="small" onChange={change_prov2} value={prov2}>
              {provinces.map((prov) =>
                <MenuItem key={prov} value={prov}>{prov}</MenuItem>)}
            </Select>
          </form>
        </div>
        <div className="plot_param_item" >
          <form onSubmit={handleSubmit}>
            <span className="plot_param_label" >Enable:</span>
            <Switch checked={enable_plot} onChange={change_enable_plot} />
          </form>
        </div>
      </div>
    </div>
  )
}

export default SecondRecord


/*
    <div >
      <Accordion sx={{ boxShadow: 0 }} defaultExpanded>
        <AccordionSummary
          expandIcon={<img src={ArrowDownwardIcon} width="24rem" height="24rem" />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component={'span'} sx={{ width: '100%' }}>
            <div className="plot_param_title"> Secondary Plot (Optional)</div>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={'span'} >
            <div className="plot_param_title_description">
              These will be displayed as dotted lines in the chart</div>
            <br />
            <form onSubmit={handleSubmit}>
              <div className="plot_param_container">
                <div className="plot_param_item" >
                  <span className="plot_param_label" >Tax Year:</span>
                  <Select size="small" onChange={change_year2} value={year2}>
                    {years.map((year) => 
                      <MenuItem key={year} value={year}>{year}</MenuItem>)}
                  </Select>
                </div>
                <div className="plot_param_item" >
                  <span className="plot_param_label" >Province:</span>
                  <Select size="small" onChange={change_prov2} value={prov2}>
                    {provinces.map((prov) => 
                      <MenuItem key={prov} value={prov}>{prov}</MenuItem>)}
                  </Select>
                </div>
                <div className="plot_param_item" >
                  <span className="plot_param_label" >Enable:</span>
                  <Switch checked={enable_plot} onChange={change_enable_plot} />
                </div>
              </div>
            </form>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
    */