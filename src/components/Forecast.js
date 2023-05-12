import React from 'react';
import { WiThermometer, WiSunrise, WiSunset, WiWindBeaufort3, WiHumidity, WiFog } from "react-icons/wi";

const Forecast = ({ forecast }) => {
  const getHumidity = (weatherData) => {
    return weatherData.main.humidity;
  };

  const getSunrise = (weatherData) => {
    const sunriseTimestamp = weatherData.sys?.sunrise;
    const sunriseDate = new Date(sunriseTimestamp * 1000);
    return sunriseDate.toLocaleTimeString();
  };

  const getSunset = (weatherData) => {
    const sunsetTimestamp = weatherData.sys?.sunset;
    const sunsetDate = new Date(sunsetTimestamp * 1000);
    return sunsetDate.toLocaleTimeString();
  };

  const getWindSpeed = (weatherData) => {
    return weatherData.wind.speed;
  };

  const getForecastForNext5Days = () => {
    if (forecast.length === 0) {
      return null;
    }

    const next5DaysForecast = forecast.filter((item, index) => index % 8 === 0).slice(1, 6);

    const forecastElements = next5DaysForecast.map((item, index) => {
      const date = new Date(item.dt_txt);
      const day = date.toLocaleDateString('en-US', { weekday: 'long' });
      const temperature = Math.round(item.main.temp);
      const humidity = getHumidity(item);
      const sunrise = getSunrise(item);
      const sunset = getSunset(item);
      const windSpeed = getWindSpeed(item);

      return (
        <div key={index} className="forecast-box">
          <div className='forecast-item'>
            <div className="forecast-day"> {day}</div>
            <div className="forecast-temp">
              <WiThermometer size={40}/>Temperature {temperature}°C
            </div>
            <div className="forecast-humidity">
              <WiHumidity size={40}/> Humidity {humidity} %
            </div>
            <div className="forecast-sunrise">
            <WiSunrise size={40}/> {sunrise ? `Sunrise: ${sunrise}` : ""}
        
            </div>
            <div className="forecast-sunset">
            <WiSunset size={40}/> {sunset ? `Sunset: ${sunset}` : ""}
            </div>
            <div className="forecast-wind">
              <WiWindBeaufort3  size={40}/> Windspeed {windSpeed}
            </div>
          </div>
        </div>
      );
    });

    return forecastElements;
  };

  return (
    <div>
      {getForecastForNext5Days()}
    </div>
  );
};

export default Forecast;
