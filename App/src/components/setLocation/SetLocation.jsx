import { useContext, useEffect } from "react";
import { weatherContext } from "../../contexts/WeatherContext";
import useWeatherData from "../../Hooks/Weather/useWeather";


function SetLocation(){
  const {searchCity}=useContext(weatherContext)
  const { data, error, loading } = useWeatherData(searchCity);

  useEffect(()=>{
    console.log(searchCity);
   
  },[searchCity])

  return (
    <div>{searchCity}</div>
  )
}

export default SetLocation;