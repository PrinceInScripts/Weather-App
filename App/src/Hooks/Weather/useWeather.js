import { useCallback, useEffect, useState } from "react"
import { useWeather } from "../../contexts/WeatherContext"
import axios from "axios"


const useWeatherData= ()=>{
    const [data,setData]=useState([])
    const [error,setError]=useState(null)
    const [loading,setLoading]=useState(false)
    // const {searchCity}=useWeather()
    const searchCity="kota,rajasthan"

    const loadData=useCallback(async ()=>{
        setLoading(true)
        console.log("seacchcity",searchCity);
        try {
            const response=await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=ad11eecf0aae4998a5345016241901&q=${searchCity}&days=1&aqi=no&alerts=no`)
            console.log(response);
            console.log(response.data);
            setData(response.data)
        } catch (error) {
            console.log(error.message);
            setError(error.message)
        }finally{
            setLoading(false)
        }
    },[searchCity])

   useEffect(()=>{
    loadData()
   },[loadData])

   return {data,error,loading}
}


export default useWeatherData