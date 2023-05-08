import React from 'react';
import { RiSunFill, RiSunsetFill, RiTemperatureFill, RiWindFill , RiHumidityFill, RiEyeFill} from 'react-icons/ri';



const Forecast = ({ forecast }) => {
  const getForecastForNext5Days = () => {
    if (forecast.length === 0) {
      return null;
    }

    const next5DaysForecast = forecast.filter((item, index) => index % 8 === 0).slice(1, 6);

    const forecastElements = next5DaysForecast.map((item, index) => {
      const date = new Date(item.dt_txt);
      const day = date.toLocaleDateString('en-US', { weekday: 'long' });
      const temperature = Math.round(item.main.temp);

      return (
        <div key={index} className="forecast-box">
        <div className='forecast-item'>  
          <div className="forecast-day">{day}</div>
          <div className="forecast-temp">{temperature}°C</div></div>
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
