import {createSlice} from '@reduxjs/toolkit'

const initial_params = {
  chart_key: "truetruetruetruetruetrue",
  primary : {
    income: 50000,
    prov: 'AB',
    year: '2013',
    use_ratio: false,
    is_plotted: true
  },
  secondary : {
    //income2: 50000,
    prov2: 'AB',
    year2: '2013',
    //use_ratio2: false,
    //is_plotted2: false
  },
  use_ratio: false,
  enable_second_plot: false,
  display_options: {
    total_tax: true,
    total_income_tax: true,
    fed_income_tax: true,
    prov_income_tax: true,
    cpp: true,
    ei: true
  }
}

const plot_params_slice = createSlice({
  name: "plot_params",
  initialState: initial_params,
  reducers: {
    set_primary_params(state, action){
      console.log('====== action.payload', action.payload)
      Object.keys(action.payload)
        .filter(key => key in state.primary)
        .forEach((key) => state.primary[key] = action.payload[key])
    },
    set_secondary_params(state, action){
      console.log('====== action222.payload', action.payload)
      Object.keys(action.payload)
        .filter(key => key in state.secondary)
        .forEach((key) => state.secondary[key] = action.payload[key])
    },
    set_use_ratio(state, action){
      state.use_ratio = action.payload
    },
    set_enable_second_plot(state, action){
      state.enable_second_plot = action.payload
    },
    set_display_options(state, action){
      console.log('====== action.payload', action.payload)
      Object.keys(action.payload)
        .filter(key => key in state.display_options)
        .forEach((key) => state.display_options[key] = action.payload[key])
      state.chart_key = set_chart_key(state.display_options)
      console.log(' . state is ', state.chart_key)
    }
    /*
    set_primary_income(state, action) {
      state.primary.income = action.payload
    },
    set_seconday_income(state, action) {
      state.secondary.income = action.payload
    },
    set_primary_prov(state, action) {
      state.primary.prov = action.payload
    },
    set_secondary_prov(state, action) {
      state.secondary.prov = action.payload
    },
    set_primary_ratio(state, action) {
      state.primary.use_ratio = action.payload
    },
    set_secondary_ratio(state, action) {
      state.secondary.use_ratio = action.payload
    },
    show_primary_plot(state) {
      state.primary.is_plotted = true
    },
    show_secondary_plot(state) {
      state.secondary.is_plotted = true
    },
    hide_primary_plot(state) {
      state.primary.is_plotted = false
    },
    hide_secondary_plot(state) {
      state.secondary.is_plotted = false
    },
    */
  }
})

const set_chart_key = (display_options) => {
  let d = display_options
  let key = d.total_tax + '' +
    d.total_income_tax + '' + 
    d.fed_income_tax + '' +
    d.prov_income_tax + '' +
    d.cpp + '' +
    d.ei;
  return key
}

export const {
  set_primary_params, 
  set_secondary_params,
  set_use_ratio,
  set_enable_second_plot,
  set_display_options
} = plot_params_slice.actions

export default plot_params_slice.reducer