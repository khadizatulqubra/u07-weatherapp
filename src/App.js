import React, { useState, useEffect } from "react";
import Forecast from "./components/Forecast";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";
import { WiThermometer,WiSunrise,WiSunset,WiWindBeaufort3,WiHumidity,WiFog} from "react-icons/wi";

const api = {
  key: "4255f44a4c1e5f98d41b39505897fa5d",
  base: "https://api.openweathermap.org/data/2.5/",
};
// const iconUrl=" https://openweathermap.org/img/wn/10d@2x.png"

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]);

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=metric`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  useEffect(() => {
    if (weather.coord) {
      fetch(
        `${api.base}forecast?lat=${weather.coord.lat}&lon=${weather.coord.lon}&appid=${api.key}&units=metric`
      )
        .then((res) => res.json())
        .then((result) => {
          setForecast(result.list);
          console.log(result);
        });
    }
  }, [weather]);
  return (
    <ErrorBoundary>
      <div
        className={
          typeof weather.main != "undefined"
            ? weather.main.temp > 16
              ? "app warm"
              : "app"
            : "app"
        }
      >
        <main>
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="Search your city....."
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </div>
          {typeof weather.main != "undefined" ? (
            <div>
              <div className="location-box">
                <div className="location">
                  {weather.name}, {weather.sys.country}
                </div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div className="weather-box">
            <div className="temp">
           
            Temperature{" "}
            {Math.round(weather.main.temp)}°C
                <div className="weather">{weather.weather[0].main}</div>
                <WiThermometer className="" size={50}/> 
            </div>
                <div className="weather-info">
                  <div className="tempinfo">
                  <WiHumidity size={50} className="icons" /> Humidity <span>{Math.round(weather.main.humidity)}% </span> 
                  </div>

                  <div className="tempinfo">
                    <WiFog size={50} className="icons"/>
                    Visibility <span>{Math.round(weather.visibility)} mi</span>
                  </div>
                  <div className="tempinfo">
                 <  WiWindBeaufort3 size={50} className="icons"/> 
                    Wind Speed{" "}
                    <span>{Math.round(weather.wind.speed)} Km/h</span>
                  </div>
                  <div className="tempinfo">
          <WiSunrise size={50}  className="icons"/> Sunrise{" "}
          <span>
            {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
          </span>
        </div>
        <div className="tempinfo">
          <WiSunset size={50}  className="icons"/>
          Sunset{" "}
          <span>
            {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
          </span>
        </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="forecast-box">
            <h2 className="forecast-header">
              Weather Forecast for the Next 5 Days
            </h2>
            <Forecast className='forecast-item' forecast={forecast} />
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
