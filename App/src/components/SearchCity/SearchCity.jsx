import { useEffect } from "react"
import useSearchCity from "../../Hooks/Search/useSearchCity"
import { useWeather } from "../../contexts/WeatherContext"


function SearchCityName(){
   const {inputData,setInputData,setCity,suggestion,city,loading,error}=useSearchCity()
   const {searchCity,setSearchCity}=useWeather()



   const handleInputChange = (event) => {
    setInputData(event.target.value);
  };

  const hanldeInputData=(item)=>{
   setInputData(item.display_name)
   setSearchCity(item.display_name);
   console.log(searchCity);
  }

   return(
    <div>
        <input 
        type="text" 
        placeholder="Search City"
        className="border-2 px-4 py-2"
        value={inputData}
        onChange={handleInputChange}
        />

        {suggestion.length>0 && <ul>
           {suggestion.map((suggest)=>(
            <li key={suggest.place_id} onClick={()=>hanldeInputData(suggest)} className="cursor-pointer border-2">{suggest.display_name}</li>
           )) }   
        </ul>}
    </div>
   )
}


export default SearchCityName