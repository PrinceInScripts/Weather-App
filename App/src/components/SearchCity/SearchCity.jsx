import { useContext, useEffect } from "react"
import useSearchCity from "../../Hooks/Search/useSearchCity"
import { useWeather, weatherContext } from "../../contexts/WeatherContext"
import Layout from "../../Layout/Layout"
import useWeatherData from "../../Hooks/Weather/useWeatherData"
import { useNavigate } from "react-router-dom"


function SearchCityName(){
   const {inputData,setInputData,suggestion,setSuggestion}=useSearchCity()
   const {searchCity,setSearchCity,Locations,setLocations}=useContext(weatherContext)
   const {data,loading,error}=useWeatherData(searchCity)
   const navigate=useNavigate()



   const handleInputChange = (event) => {
    setInputData(event.target.value);
  };

  const hanldeInputData=(item)=>{
   setInputData(item.display_name)
   setSearchCity(item.display_name);

  setSuggestion([])
  const locationInfo = `${data?.location?.name} ${data?.location?.region}`;
  setLocations((prev) => [...prev, [locationInfo]]);
     console.log(Locations);
    navigate("/")
  }



   return(
      <Layout>
    <div className="min-h-[70vh] flex flex-col gap-10 items-center justify-center">
      <div className="flex flex-col justify-center items-center gap-5">
      <h1 className="text-3xl font-bold">Search City</h1>
        <p className="text-lg">Enter the name of the city you want to search for.</p>
      </div>
    
        <input 
        type="text" 
        placeholder={`Search City (${searchCity || 'Current City'})`} 
        className="input input-bordered input-success w-full max-w-xs"
        value={inputData}
        onChange={handleInputChange}
        />

        {suggestion.length>0 && <ul>
           {suggestion.map((suggest)=>(
            <li key={suggest.place_id} onClick={()=>hanldeInputData(suggest)} className="cursor-pointer border-b-2 w-full px-4 py-2">{suggest.display_name}</li>
           )) }   
        </ul>}
    </div>
    </Layout>
   )
}


export default SearchCityName