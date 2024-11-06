import {createSlice} from '@reduxjs/toolkit'
import chart_data from '../charts/data'

const plot_options_slice = createSlice({
  name: "plot_options",
  initialState: {},
  reducers: {
    set_options(state, action){
      console.log('Hant')
      return action.payload
    }
  }
})

export const {set_options} = plot_options_slice.actions
export default plot_options_slice.reducer