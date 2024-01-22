import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { WeatherProvider } from './contexts/WeatherContext.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <WeatherProvider value={{ searchCity: '', setSearchCity: () => {}, CurrentDay: [], ForcastDay: [], Hours: [] }}>
    <App />
  </WeatherProvider>,
)
