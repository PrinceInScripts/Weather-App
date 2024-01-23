import { useContext, useEffect, useState } from "react";
import { weatherContext } from "../../contexts/WeatherContext";
import useWeatherData from "../../Hooks/Weather/useWeatherData";
import SearchCityName from "../SearchCity/SearchCity";
import moment from 'moment';

function SetLocation() {
    const { searchCity, Locations, setLocations, CurrentDay, setCurrentDay, setForcastDay,Hours, ForcastDay, setHours } = useContext(weatherContext);
    const { data, error, loading } = useWeatherData();

    useEffect(() => {
      if (searchCity && data && Object.keys(data).length > 0) {
          console.log("Setting data...", data);
  
          setCurrentDay(data.current);
          setForcastDay(data.forecast.forecastday[0].day);
          setHours(data.forecast.forecastday[0].hour);
          setLocations((prev) => [...prev, data.location.name]);
  
          console.log("CurrentDay:", CurrentDay);
          console.log("ForcastDay:", ForcastDay);
          console.log("Hours:", Hours);
          console.log("Locations:", Locations);
      }
  }, [searchCity, data, setLocations, setCurrentDay, setForcastDay, setHours]);
  
  useEffect(() => {
      console.log("Updated data:", data);
      console.log("Updated CurrentDay:", CurrentDay);
      console.log("Updated ForcastDay:", ForcastDay);
      console.log("Updated Hours:", Hours);
      console.log("Updated Locations:", Locations);
  }, [data, CurrentDay, ForcastDay, Hours, Locations]);
    const initialLoad = !searchCity && loading;

    if (loading && initialLoad) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-[90vh] bg-black flex px-4 py-2 text-white">
            <div className="w-[40%]">
                <div>
                    <SearchCityName />
                </div>
                <div>
                    <div>
                      {CurrentDay?.temp_c}
                      {CurrentDay?.condition?.text}
                      <img src={CurrentDay?.condition?.icon} alt="" />
                    </div>
                    <div>
                      <div>{CurrentDay?.feelslike_c}</div>
                      <div>{CurrentDay?.precip_in}</div>
                      <div>{CurrentDay?.pressure_in}</div>
                      <div>{CurrentDay?.humidity}</div>
                      <div>{CurrentDay?.wind_kph}</div>
                    </div>
                </div>
            </div>
            <div className="w-[60%]">
              <div>
                <h1>Forcast of the day</h1>
                <div>
                  <p>Avg temp : {ForcastDay.avgtemp_c}</p>
                </div>
                <div>
                  <p>Day condition : {ForcastDay?.condition?.sunny}</p>
                  <img src={ForcastDay?.condition?.icon} alt="" />
                </div>
                <div>
                  <p>Max temp : {ForcastDay?.maxtemp_c}</p>
                  <p>Max temp : {ForcastDay?.mintemp_c}</p>
                </div><div>
                  <p>UV : {ForcastDay.uv}</p>
                </div>
              </div>
              <div>
                {Hours?.map((hour)=>(
                  <div key={hour.time_epoch}>
                      <p>{moment(hour.time).format('HH:mm')}</p>
                      <div>
                        <p>cloud : {hour?.condition.text}</p>
                        <img src={hour?.condition.icon} alt="" />
                      </div>
                      <p>temp : {hour?.temp_c}</p>
                  </div>
                ))}
              </div>
            </div>
        </div>
    );
}

export default SetLocation;