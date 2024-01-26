import { useContext, useEffect, useRef, useState } from "react";
import Layout from "../Layout/Layout";
import { weatherContext } from "../contexts/WeatherContext";
import useWeatherData from "../Hooks/Weather/useWeatherData";
import { FaLocationDot } from "react-icons/fa6";
import { WiDegrees } from "react-icons/wi";
import { TbTemperatureCelsius } from "react-icons/tb";
import { CiDroplet } from "react-icons/ci";
import { TbUvIndex } from "react-icons/tb";
import { WiSunrise } from "react-icons/wi";
import { WiSunset } from "react-icons/wi";
import { LuMoon } from "react-icons/lu";
import { WiMoonrise } from "react-icons/wi";
import { WiMoonset } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import dayImage from "../assets/dayImage.jpg";
import nightImage from "../assets/nightImage.jpg";
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";

function Home() {
  const {
    searchCity,
    Locations,
    setLocations,
    CurrentDay,
    setCurrentDay,
    setForcastDay,
    Hours,
    ForcastDay,
    setHours,
  } = useContext(weatherContext);
  const { data, error, loading } = useWeatherData();
  const [dayTime, setDayTime] = useState(true);
  const containerRef = useRef(null);

  // Function to scroll to the left
  const scrollToLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 200; // Adjust the value as needed
    }
  };

  // Function to scroll to the right
  const scrollToRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 200; // Adjust the value as needed
    }
  };

  useEffect(() => {
    if (searchCity && data && Object.keys(data).length > 0) {
      setCurrentDay(data.current);
      setForcastDay(data.forecast.forecastday.map((day) => day));
      setHours(data.forecast.forecastday.map((day) => day.hour));
    }
  }, [searchCity, data, setLocations, setCurrentDay, setForcastDay, setHours]);

  function formatLastUpdatedTime(lastUpdatedString) {
    const lastUpdatedDate = new Date(lastUpdatedString);

    const options = { weekday: "short", month: "short", day: "numeric" };
    const formattedDate = lastUpdatedDate.toLocaleDateString(
      undefined,
      options
    );

    const formattedTime = lastUpdatedDate.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    const formattedDateTime = `${formattedDate} ${formattedTime}`;

    return formattedDateTime;
  }

  function formatLastUpdatedTimeAMPM(lastUpdatedString) {
    const lastUpdatedDate = new Date(lastUpdatedString);

    // Format the time with AM/PM
    const formattedTimeAMPM = lastUpdatedDate.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return formattedTimeAMPM;
  }

  function formatDateWithWeekday(dateString) {
    const currentDate = new Date();
    const inputDate = new Date(dateString);

    const options = { weekday: "long" };

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

  function day() {
    const currentDate = new Date();
    const hour = currentDate.getHours();
    if (hour <= 6 && hour >= 18) {
      setDayTime(false);
    }
  }

  useEffect(() => {
    day();
  }, [dayTime]);

  if (loading) {
    return (
        <div className="flex justify-center items-center h-full">
          <TailSpin color="red" radius={8} />
        </div>
      );
  }


  return (
    <div className="relative">
      {/* Background Image */}
      {dayTime ? (
        <img
          src={dayImage}
          className="w-full h-[30rem] object-cover fixed top-0 left-0 z-0"
          alt="Daytime background image"
        />
      ) : (
        <img
          src={nightImage}
          className="w-full h-[30rem] object-cover fixed top-0 left-0 z-0"
          alt="Nighttime background image"
        />
      )}

      {/* Text Overlay */}
      <div
        className={`absolute top-40 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
          dayTime ? "text-black" : "text-white"
        }  text-4xl font-bold text-center w-full z-1`}
      >
        Weather
      </div>

      <Layout>
        <div className="min-h-90vh ">
          <div className="mt-60 py-5 px-4 lg:py-10 lg:px-8 relative rounded-xl z-10 bg-white">
            <div>
              <p className="flex items-center gap-2 text-2xl font-semibold">
                <FaLocationDot /> {data?.location?.name} ,{" "}
                {data?.location?.region}
              </p>
              <p className="flex items-center font-semibold font-serif text-gray-500">
                {formatLastUpdatedTime(CurrentDay.last_updated)}
              </p>
            </div>
            <div className="flex lg:justify-between lg:flex-row items-center">
              <div className="flex items-center">
                <img
                  src={CurrentDay?.condition?.icon}
                  alt=""
                  className="lg:w-28 w-14 "
                />
                <p className="lg:text-4xl text-2xl flex gap-0">
                  {CurrentDay?.temp_c}
                  <WiDegrees size={40} className="font-bold" />
                </p>
              </div>
              <div className="flex flex-col w-40 items-end ">
                <p>{CurrentDay?.condition?.text}</p>
                <p>
                  {ForcastDay[0]?.day?.maxtemp_c}/
                  {ForcastDay[0]?.day?.mintemp_c}
                </p>
                <div className="flex">
                    <p>Feels like {CurrentDay?.feelslike_c}</p> 
                    </div>
              </div>
            </div>
            <div className="flex overflow-hidden">
              <button onClick={scrollToLeft} className="p-2 rounded-full">
                <FaChevronCircleLeft size={24} />
              </button>
              <div
                ref={containerRef}
                className="flex overflow-auto lg:px-10 lg:py-10 py-5 px-2 gap-10"
              >
                {Hours[0]?.length > 0 &&
                  Hours[0]?.map((hour) => (
                    <div
                      key={hour.time_epoch}
                      className="flex items-center flex-col"
                    >
                      <p className="w-20 text-sm lg:text-lg">
                        {formatLastUpdatedTimeAMPM(hour.time)}
                      </p>
                      <img src={hour?.condition?.icon} alt="" className="lg:w-full w-16"/>
                      <p className="flex font-semibold text-sm lg:text-lg items-center">
                        {hour?.temp_c}
                        <TbTemperatureCelsius size={24} />
                      </p>
                    </div>
                  ))}
              </div>
              <button onClick={scrollToRight} className=" p-2 rounded-full">
                <FaChevronCircleRight size={24} />
              </button>
            </div>
          </div>
          <div className="mt-60 py-5 pr-2 lg:py-10 h-full rounded-xl border-2 relative z-10 bg-white">
            {ForcastDay?.length > 0 &&
              ForcastDay.map((day) => (
                <div
                  key={day?.date}
                  className="flex items-center lg:justify-between"
                >
                  <div className="lg:w-40 w-24 lg:text-xl text-sm">{formatDateWithWeekday(day?.date)}</div>

                  <div className="flex items-center ">
                    <CiDroplet size={16} />
                    <p className="text-sm lg:text-lg">{day?.day?.daily_chance_of_rain}</p>
                    <p className="text-sm lg:text-lg">%</p>
                  </div>

                  <div className="flex items-center justify-center w-32 lg:w-40">
                    <img src={day?.day?.condition?.icon} alt="" className="lg:w-20 w-10"/>
                    <p className="lg:text-lg hidden lg:block text-sm">{day?.day?.condition?.text}</p>
                  </div>

                  <div className="w-20 text-sm">
                    {day?.day?.maxtemp_c}/{day?.day?.mintemp_c}
                  </div>
                </div>
              ))}
          </div>
          <div className="mt-60 py-5 px-4 lg:py-10 border-2 relative rounded-xl z-10 bg-white">
            <div>
              <div className="flex justify-between border-b-2 py-4">
                <div className="flex items-center gap-2">
                  <TbUvIndex size={30} className="text-yellow-500" />
                  <p className="text-xl font-semibold font-serif">UV Index</p>
                </div>

                <p className="font-bold">{CurrentDay?.uv}</p>
              </div>
              <div className="flex justify-between border-b-2 py-4">
                <div className="flex items-center gap-2">
                  <WiSunrise size={30} className="text-yellow-500" />
                  <p className="text-xl font-semibold font-serif">Sunrise</p>
                </div>

                <p className="font-bold">{ForcastDay[0]?.astro?.sunrise}</p>
              </div>
              <div className="flex justify-between border-b-2 py-4">
                <div className="flex items-center gap-2">
                  <WiSunset size={30} className="text-yellow-500" />
                  <p className="text-xl font-semibold font-serif">Sunset</p>
                </div>

                <p className="font-bold">{ForcastDay[0]?.astro?.sunset}</p>
              </div>
              <div className="lg:flex hidden justify-between border-b-2 py-4">
                <div className="flex items-center gap-2">
                  <LuMoon size={30} className="text-yellow-500" />
                  <p className="text-xl font-semibold font-serif">Moon Phase</p>
                </div>

                <p className="font-bold">{ForcastDay[0]?.astro?.moon_phase}</p>
              </div>
              <div className="flex justify-between border-b-2 py-4">
                <div className="flex items-center gap-2">
                  <WiMoonrise size={30} className="text-blue-600" />
                  <p className="text-xl font-semibold font-serif">Moon rise</p>
                </div>

                <p className="font-bold">{ForcastDay[0]?.astro?.moonrise}</p>
              </div>
              <div className="flex justify-between border-b-2 py-4">
                <div className="flex items-center gap-2">
                  <WiMoonset size={30} className="text-blue-600" />
                  <p className="text-xl font-semibold font-serif">Moon set</p>
                </div>

                <p className="font-bold">{ForcastDay[0]?.astro?.moonset}</p>
              </div>
              <div className="flex justify-between border-b-2 py-4">
                <div className="flex items-center gap-2">
                  <FaWind size={30} className="text-gray-500" />
                  <p className="text-xl font-semibold font-serif">Wind</p>
                </div>

                <p className="font-bold">{CurrentDay?.wind_kph} kph</p>
              </div>
              <div className="flex justify-between border-b-2 py-4">
                <div className="flex items-center gap-2">
                  <WiHumidity size={30} className="text-sky-500" />
                  <p className="text-xl font-semibold font-serif">Humidity</p>
                </div>

                <p className="font-bold">{CurrentDay?.humidity}%</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Home;
