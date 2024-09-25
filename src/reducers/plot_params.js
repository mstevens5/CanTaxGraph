import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  primary : {
    income: 100000,
    prov: 'AB',
    use_ratio: false,
    is_plotted: true
  },
  secondary : {
    income: 50000,
    prov: 'AB',
    use_ratio: false,
    is_plotted: false
  }
}

const plot_options_slice = createSlice({
  name: "plot_options"
})

const plot_params_slice = createSlice({
  name: "plot_params",
  initialState,
  reducers: {
    set_primary_params(state, action){
      state.primary = {...action.payload}
    },
    set_secondary_params(state, action){
      state.secondary = {...action.payload}
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

export const {
  set_primary_params, 
  set_secondary_params
} = plot_params_slice.actions

export default plot_params_slice.reducer