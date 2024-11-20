import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  set_use_ratio,
  set_display_options
} from '../reducers/plot_params'
import chart_data from '../charts/data'
import icon from "../img/icons8-info-32_2.png"

import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from '@mui/material';
import FormGroup from "@mui/material/FormGroup";
import Collapse from '@mui/material/Collapse';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import {
  List,
  ListItem,
  OutlinedInput,
  FormControl,
  InputBase,
  Tooltip
} from '@mui/material';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@mui/material'

import ArrowDownwardIcon from "../img/arrow_downward_icon.png"

const DisplayOptions = () => {
  const dispatch = useDispatch()

  const use_ratio = useSelector(({ plot_params }) => {
    return plot_params.use_ratio
  })
  const { total_tax,
    total_income_tax,
    fed_income_tax,
    prov_income_tax,
    cpp,
    ei } = useSelector(({ plot_params }) => { return plot_params.display_options })

  let display_options = {
    total_tax,
    total_income_tax,
    fed_income_tax,
    prov_income_tax,
    cpp,
    ei
  }

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
    dispatch(set_display_options({ total_tax: e.target.checked }))
    //chart_data.set_visibility(display_options)
  }
  const toggle_total_income_tax = (e) => {
    dispatch(set_display_options({ total_income_tax: e.target.checked }))
    //chart_data.set_visibility({total_income_tax:e.target.checked})
  }
  const toggle_fed_income_tax = (e) => {
    dispatch(set_display_options({ fed_income_tax: e.target.checked }))
    //chart_data.set_visibility({fed_income_tax:e.target.checked})
  }
  const toggle_prov_income_tax = (e) => {
    dispatch(set_display_options({ prov_income_tax: e.target.checked }))
    //chart_data.set_visibility({prov_income_tax:e.target.checked})
  }
  const toggle_cpp = (e) => {
    dispatch(set_display_options({ cpp: e.target.checked }))
    //chart_data.set_visibility({cpp:e.target.checked})
  }
  const toggle_ei = (e) => {
    dispatch(set_display_options({ ei: e.target.checked }))
    //chart_data.set_visibility({ei:e.target.checked})
  }
  return (
    <div>
      <div className="display_options_title">Display Options
        <span style={{ paddingRight: '15px' }}>
          <Tooltip
            title="Select which taxes to display"
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
            <img src={icon} width="20" height="20" />
          </Tooltip>
        </span>
      </div>
      <div className="display_options_container">
        <div className="line_display_option">
          <FormControlLabel
            margin="none"
            label="Total Tax"
            control={<Checkbox checked={total_tax} onChange={toggle_total_tax}
            />}
          />
        </div>
        <div className="line_display_option">
          <FormControlLabel
            label="Total Income Tax"
            control={<Checkbox checked={total_income_tax} onChange={toggle_total_income_tax}
            />}
          />
        </div>
        <div className="line_display_option">
          <FormControlLabel
            label="Federal Income Tax"
            control={<Checkbox checked={fed_income_tax} onChange={toggle_fed_income_tax}
            />}
          />
        </div>
        <div className="line_display_option">
          <FormControlLabel
            label="Provincial Income Tax"
            control={<Checkbox checked={prov_income_tax} onChange={toggle_prov_income_tax}
            />}
          />
        </div>
        <div className="line_display_option">
          <FormControlLabel
            label="CPP"
            control={<Checkbox checked={cpp} onChange={toggle_cpp}
            />}
          />
        </div>
        <div className="line_display_option">
          <FormControlLabel label="EI"
            control={<Checkbox checked={ei} onChange={toggle_ei}
            />}
          />
        </div>
      </div>
      {/*
      <div className="display_options_title">General Options</div>
      <FormControlLabel
        margin="none"
        label="Tax Ratio"
        control={<Checkbox checked={use_ratio} onChange={change_use_ratio}
        />}
      />
      <span className="ratio_description">
        ** Display taxes as a percentage of total income
      </span>
      */}
    </div>
  )
}

export default DisplayOptions


/*
    <div>
      <Accordion sx={{ boxShadow: 0 }} defaultExpanded>
        <AccordionSummary
          expandIcon={<img src={ArrowDownwardIcon} width="24rem" height="24rem" />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component={'span'} sx={{ width: '100%' }}>
            <div className="display_options_title">Display Options
              <span style={{ paddingRight: '15px' }}>
                <Tooltip
                  title="Select which taxes to display"
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
                  <img src={icon} width="24" height="24" />
                </Tooltip>
              </span>
            </div>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={'span'} >
            <hr className="title_rule" />
            <div className="display_options_container">
              <div className="line_display_option">
                <FormControlLabel
                  margin="none"
                  label="Total Tax"
                  control={<Checkbox checked={total_tax} onChange={toggle_total_tax}
                  />}
                />
              </div>
              <div className="line_display_option">
                <FormControlLabel
                  label="Total Income Tax"
                  control={<Checkbox checked={total_income_tax} onChange={toggle_total_income_tax}
                  />}
                />
              </div>
              <div className="line_display_option">
                <FormControlLabel
                  label="Federal Income Tax"
                  control={<Checkbox checked={fed_income_tax} onChange={toggle_fed_income_tax}
                  />}
                />
              </div>
              <div className="line_display_option">
                <FormControlLabel
                  label="Provincial Income Tax"
                  control={<Checkbox checked={prov_income_tax} onChange={toggle_prov_income_tax}
                  />}
                />
              </div>
              <div className="line_display_option">
                <FormControlLabel
                  label="CPP"
                  control={<Checkbox checked={cpp} onChange={toggle_cpp}
                  />}
                />
              </div>
              <div className="line_display_option">
                <FormControlLabel label="EI"
                  control={<Checkbox checked={ei} onChange={toggle_ei}
                  />}
                />
              </div>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ boxShadow: 0 }} defaultExpanded>
        <AccordionSummary
          expandIcon={<img src={ArrowDownwardIcon} width="24rem" height="24rem" />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component={'span'} sx={{ width: '100%' }}>
            <div className="display_options_title">General Options</div>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={'span'} >
            <hr className="title_rule" />
            <FormControlLabel
              margin="none"
              label="Tax Ratio"
              control={<Checkbox checked={use_ratio} onChange={change_use_ratio}
              />}
            />
            <span className="ratio_description">
              ** Display taxes as a percentage of total income
            </span>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
    */