import { useCallback, useEffect, useState } from "react"
import axios from 'axios'



const useSearchCity=()=>{
     const [inputData,setInputData]=useState('')
     const [suggestion,setSuggestion]=useState([])
     const [loading,setLoading]=useState(false)
     const [error,setError]=useState('')
     
     const loadData=useCallback(async()=>{
          setLoading(true)
          try{
               if (inputData.trim() !== '') { 
               const response=await axios.get(`https://api.locationiq.com/v1/autocomplete?key=pk.bc3a694a2275b4fb6b628abe9799f9bc&q=${inputData}`)
               setSuggestion(response.data)
               }
               setLoading(false)
          }catch(err){
               setError(err.message)
               setLoading(false)
          }
     },[inputData])

     useEffect(()=>{
          loadData()
     },[loadData])

     return {inputData,setInputData,setSuggestion,suggestion,loading,error}
}


export default useSearchCity;