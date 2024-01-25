import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { useContext, useEffect } from "react";
import { weatherContext } from "../contexts/WeatherContext";
import useWeatherData from "../Hooks/Weather/useWeatherData";
import { WiDegrees } from "react-icons/wi";
import { RiMapPinAddLine } from "react-icons/ri";

function Layout({ children }) {
  const { searchCity, Locations, setSearchCity } = useContext(weatherContext);
  const { data, loading, error } = useWeatherData(searchCity);
  const navigate = useNavigate();

  function chnageWidth() {
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "auto";
  }

  function hideDrawer() {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;

    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "0";
  }

  return (
    <div className="min-h-[90vh] ">
      <div className="flex items-center justify-between w-full ">
        <div className="drawer absolute left-0 z-50 w-fit">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content  fixed">
            <label htmlFor="my-drawer">
              <FiMenu
                onClick={chnageWidth}
                size={"32px"}
                className="font-bold m-4 cursor-pointer"
              />
            </label>
          </div>
          <div className="drawer-side w-0">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <ul className="menu p-4 w-48 h-[100%] sm:w-80 bg-base-100 text-base-content relative">
              <li className="w-fit absolute right-2 z-50">
                <button onClick={hideDrawer}>
                  <AiFillCloseCircle size={24} />
                </button>
              </li>
              <li className="mt-10">
                <div>
                  <Link to={"/add-location"}>
                    <button className="flex gap-2 btn btn-neatural items-center text-2xl font-bold w-56">
                      {" "}
                      <RiMapPinAddLine size={24} /> Location
                    </button>
                  </Link>
                </div>
              </li>
              <li className="mt-20">
                <p>Favourite Location</p>
                <div className="flex items-center gap-4 ">
                  <div className="flex items-center justify-center gap-2">
                    <FaLocationDot />
                    <p>{searchCity}</p>
                  </div>
                  <div className="flex items-center">
                    <img
                      src={data?.current?.condition?.icon}
                      alt=""
                      className="w-12"
                    />
                    <p className="flex">
                      {data?.current?.temp_c}
                      <WiDegrees size={24} />
                    </p>
                  </div>
                </div>
              </li>
              <li className="border-b-2 border-dashed"></li>
              <li>
                {Locations.length > 0 && <h1>Other Location</h1>}

                {Locations.length > 0 &&
                  Locations.map((location, index) => (
                    <p
                      key={index}
                      onClick={() => {
                        setSearchCity(location);
                        navigate("/");
                      }}
                    >
                      {location}
                    </p>
                  ))}
              </li>
              <li>
                <Link to={"/add-location"}>
                  <button className="btn btn-neatural text-center">
                    Managae Location
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

export default Layout;
