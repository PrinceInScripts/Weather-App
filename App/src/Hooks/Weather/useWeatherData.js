import { useCallback, useEffect, useState } from "react";
import { useWeather } from "../../contexts/WeatherContext";
import axios from "axios";

const useWeatherData = () => {
    const { searchCity } = useWeather();
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const loadData = useCallback(async () => {
        if (!searchCity) {
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=ad11eecf0aae4998a5345016241901&q=${searchCity}&days=7&aqi=no&alerts=no`);
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