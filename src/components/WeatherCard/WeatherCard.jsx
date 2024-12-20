import './WeatherCard.css';
import cloudy from '../../assets/cloudy.svg';
import React, { useContext } from 'react';

import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';

function WeatherCard({ weatherData }) {
const {currentTemperatureUnit} = useContext(CurrentTemperatureUnitContext);
  return (
    <div className="WeatherCard">
      <p className="WeatherCard__text">{currentTemperatureUnit === 'F'? weatherData.fahrenheitTemp : weatherData.celsiusTemp}°{currentTemperatureUnit}</p>
      <img className="WeatherCard__image" src={cloudy} alt="cloudy" />
    </div>
  );
}

export default WeatherCard;
