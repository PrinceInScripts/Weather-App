import { useCallback, useContext, useEffect, useState } from "react";
import { useWeather, weatherContext } from "../../contexts/WeatherContext";
import axios from "axios";

const useWeatherData = () => {
    const { searchCity } = useWeather();
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const loadData = useCallback(async () => {
        if (!searchCity) {
            return; // Don't make the API request if searchCity is undefined or falsy
        }

        setLoading(true);
        try {
            const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=ad11eecf0aae4998a5345016241901&q=${searchCity}&days=1&aqi=no&alerts=no`);
            setData(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [searchCity]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    return { data, error, loading };
};

export default useWeatherData;