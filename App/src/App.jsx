import { useEffect, useState } from 'react'
import './App.css'
import { WeatherProvider } from './contexts/WeatherContext'
import useWeatherData from './Hooks/Weather/useWeatherData';
import SearchCityName from './components/SearchCity/SearchCity';
import SetLocation from './components/setLocation/SetLocation';



function App() {
    const [searchCity, setSearchCity] = useState('Kota, Rajasthan');
    const [CurrentDay, setCurrentDay] = useState({});
    const [ForcastDay, setForcastDay] = useState([]);
    const [Hours, setHours] = useState([]);
    const [Locations,setLocations]=useState([])

   const {data,loading,error}=useWeatherData()  
   
  return (
    <WeatherProvider value={{searchCity,setSearchCity,CurrentDay,setCurrentDay,setForcastDay,ForcastDay,Hours,setHours,Locations,setLocations}}>
     {/* <div className='bg-black text-white'>Welcome here ..</div>
     <SearchCityName/> */}
     <SetLocation/>
    </WeatherProvider>
  )
}

export default App
