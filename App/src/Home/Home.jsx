import { useContext, useEffect } from "react";
import Layout from "../Layout/Layout";
import { weatherContext } from "../contexts/WeatherContext";
import useWeatherData from "../Hooks/Weather/useWeatherData";
import { FaLocationDot } from "react-icons/fa6";
import { WiDegrees } from "react-icons/wi";
import { TbTemperatureCelsius } from "react-icons/tb";
import { CiDroplet } from "react-icons/ci";



function Home(){
    const { searchCity, Locations, setLocations, CurrentDay, setCurrentDay, setForcastDay,Hours, ForcastDay, setHours } = useContext(weatherContext);
    const { data, error, loading } = useWeatherData();

    useEffect(() => {
        if (searchCity && data && Object.keys(data).length > 0) {
            console.log("Setting data...", data);
    
            setCurrentDay(data.current);
            setForcastDay(data.forecast.forecastday.map((day)=>day));
            setHours(data.forecast.forecastday.map((day)=>day.hour));
           
    
            console.log("CurrentDay:", CurrentDay);
            console.log("ForcastDay:", ForcastDay);
            console.log("Hours:", Hours);
           
        }
    }, [searchCity, data, setLocations, setCurrentDay, setForcastDay, setHours]);

    function formatLastUpdatedTime(lastUpdatedString) {
        const lastUpdatedDate = new Date(lastUpdatedString);
    
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        const formattedDate = lastUpdatedDate.toLocaleDateString(undefined, options);
    
        const formattedTime = lastUpdatedDate.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric', hour12: true });
    
        const formattedDateTime = `${formattedDate} ${formattedTime}`;
    
        return formattedDateTime;
    }

    function formatLastUpdatedTimeAMPM(lastUpdatedString) {
        const lastUpdatedDate = new Date(lastUpdatedString);
    
        // Format the time with AM/PM
        const formattedTimeAMPM = lastUpdatedDate.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric', hour12: true });
    
        return formattedTimeAMPM;
    }

    function formatDateWithWeekday(dateString) {
        const currentDate = new Date();
        const inputDate = new Date(dateString);
    
        const options = { weekday: 'long' };
    
        if (
            currentDate.getFullYear() === inputDate.getFullYear() &&
            currentDate.getMonth() === inputDate.getMonth() &&
            currentDate.getDate() === inputDate.getDate()
        ) {
            // If it's today, display "Today"
            return "Today";
        } else {
            // Otherwise, display the formatted date with the weekday
            return inputDate.toLocaleDateString(undefined, options);
        }
    }
    
    return (
        <div className="relative">
        {/* Background Image */}
        <img
            src="https://images.unsplash.com/photo-1541119638723-c51cbe2262aa?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGF5JTIwc2t5fGVufDB8fDB8fHww"
            className="w-full h-96 object-cover fixed top-0 left-0 z-0"
            alt=""
        />

        {/* Text Overlay */}
        <div className="absolute top-40 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black text-4xl font-bold text-center w-full z-1">
            Weather
        </div>

        <Layout>
            <div className="min-h-90vh ">
                <div className="mt-60 w-[90%]  mx-auto py-10 px-8 border-2 relative rounded-xl z-10 bg-white">
                   <div>
                    <p className="flex items-center gap-2 text-2xl font-semibold"><FaLocationDot/> {data?.location?.name} , {data?.location?.region}</p>
                    <p className="flex items-center font-semibold font-serif text-gray-500">{formatLastUpdatedTime(CurrentDay.last_updated)}</p>
                   </div>
                   <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <img src={CurrentDay?.condition?.icon} alt="" className="w-28 "/>
                        <p className="text-4xl flex gap-0">{CurrentDay?.temp_c}<WiDegrees size={40} className="font-bold"/></p>
                    </div>
                    <div className="flex flex-col">
                      <p>{CurrentDay?.condition?.text}</p>
                      <p>{ForcastDay[0]?.day?.maxtemp_c}/{ForcastDay[0]?.day?.mintemp_c}</p>
                      <p>Feels like : {CurrentDay?.feelslike_c}</p>
                    </div>
                  
                   </div>
                   <div className="flex overflow-x-auto w-full px-10 py-10 gap-10">
                        {Hours[0]?.length>0 && Hours[0]?.map((hour)=>(
                            <div key={hour.time_epoch} className="flex items-center flex-col">
                            
                            <p className=" w-20">{formatLastUpdatedTimeAMPM(hour.time)}</p>
                            <img src={hour?.condition?.icon} alt="" />
                            <p className="flex font-semibold text-lg items-center">{hour?.temp_c}<TbTemperatureCelsius size={24}/></p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-60 w-[90%] py-10 px-8  h-full mx-auto border-2 relative z-10 bg-white">
                    {ForcastDay?.length>0 && ForcastDay.map((day)=>(
                        <div key={day?.date} className="flex items-center justify-between">
                           <div className="w-40">{formatDateWithWeekday(day?.date)}</div>
                           <div className="flex items-center">
                            <CiDroplet size={16} />
                            {day?.day?.daily_chance_of_rain}
                            <p>%</p>
                            </div>
                          
                             
                             <div className="flex items-center justify-center w-40">
                                <img src={day?.day?.condition?.icon} alt="" />
                                <p>{day?.day?.condition?.text}</p>
                             </div>
                      
                           <div className="w-20">
                          {day?.day?.maxtemp_c}/{day?.day?.mintemp_c}
                           </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    </div>
    )
}

export default Home;