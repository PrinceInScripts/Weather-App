import { useEffect, useState } from 'react'
import './App.css'
import { WeatherProvider } from './contexts/WeatherContext'
import useWeatherData from './Hooks/Weather/useWeather';
import SearchCityName from './components/SearchCity/SearchCity';
import SetLocation from './components/setLocation/SetLocation';



function App() {
    const [searchCity, setSearchCity] = useState('Kota, Rajasthan, India');
    const [CurrentDay, setCurrentDay] = useState({});
    const [ForcastDay, setForcastDay] = useState([]);
    const [Hours, setHours] = useState([]);

   const {data,loading,error}=useWeatherData()  
   
  return (
    <WeatherProvider value={{searchCity,setSearchCity,CurrentDay,ForcastDay,Hours}}>
     <div className='bg-black text-white'>Welcome here ..</div>
     <SearchCityName/>
     <SetLocation/>
    </WeatherProvider>
  )
}

export default App
