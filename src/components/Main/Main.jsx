import WeatherCard from '../WeatherCard/WeatherCard';
import ItemCard from '../ItemCard/ItemCard';
import React, { useContext } from 'react';
import { CurrentTemperatureUnitContext} from '../../contexts/AppContexts';
import './Main.css';

function Main({ clothingItems, weather, handleCardClick, onCardLike}) {
  const {currentTemperatureUnit} = useContext(CurrentTemperatureUnitContext);
  return (
    <main className="Main">
      <WeatherCard weatherData={weather} />
      <p className="Main__weather-info">
        Today is {currentTemperatureUnit === 'F'? weather.fahrenheitTemp : weather.celsiusTemp}°{currentTemperatureUnit} you may want to wear:{' '}
      </p>
      <ul className="Main__item-cards">
        {clothingItems
          .filter((item) => item.weather === weather.weatherType) // Filter by weather type
          .map(
            (
              filteredItem, // Render filtered items
            ) => (
              <li key={filteredItem._id} className="Main__item-card">
                <ItemCard
                  data={filteredItem}
                  handleCardClick={handleCardClick}
                  onCardLike={onCardLike}
                />
              </li>
            ),
          )}
      </ul>
    </main>
  );
}

export default Main;
