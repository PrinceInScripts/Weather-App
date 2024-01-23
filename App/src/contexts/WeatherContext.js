import {createContext,useContext} from "react"

export const weatherContext=createContext({
    searchCity:"",
    CurrentDay:[],
    ForcastDay:[],
    setSearchCity:()=>{},
    Hours:[],
    Locations:[],
    setLocations:()=>{},
})

export const WeatherProvider=weatherContext.Provider

export const useWeather=()=>useContext(weatherContext)