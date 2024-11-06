import ReactDOM from 'react-dom/client'
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from 'react-redux'

import './index.css'
import App from './App'
import plot_params_reducer from './reducers/plot_params'
import plot_options_reducer from './reducers/plot_options'

const store = configureStore({
  reducer: {
    plot_params: plot_params_reducer
    //plot_options: plot_options_reducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
