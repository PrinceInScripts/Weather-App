import { useContext, useEffect } from "react";
import { weatherContext } from "../../contexts/WeatherContext";
import useWeatherData from "../../Hooks/Weather/useWeather";


function SetLocation(){
  const {searchCity,Locations,setLocations}=useContext(weatherContext)
  const { data, error, loading } = useWeatherData(searchCity);

  useEffect(()=>{
    setLocations((prev)=>[...prev,searchCity])
    console.log(Locations);
    console.log(data);
   
  },[searchCity])

  return (
    <div>

    </div>
  )
}

export default SetLocation;