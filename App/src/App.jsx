import { useEffect, useState } from 'react'
import './App.css'
import { WeatherProvider } from './contexts/WeatherContext'
import useWeatherData from './Hooks/Weather/useWeatherData';
import SearchCityName from './components/SearchCity/SearchCity';
import Layout from './Layout/Layout';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';



function App() {
    const [searchCity, setSearchCity] = useState('Kota, Rajasthan');
    const [CurrentDay, setCurrentDay] = useState({});
    const [ForcastDay, setForcastDay] = useState([]);
    const [Hours, setHours] = useState([]);
    const [Locations,setLocations]=useState([])

   const {data,loading,error}=useWeatherData()  
   
  return (
    <Router>
    <WeatherProvider value={{searchCity,setSearchCity,CurrentDay,setCurrentDay,setForcastDay,ForcastDay,Hours,setHours,Locations,setLocations}}>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/add-location' element={<SearchCityName/>}/>
     </Routes>
    </WeatherProvider>
    </Router>
  )
}

export default App
