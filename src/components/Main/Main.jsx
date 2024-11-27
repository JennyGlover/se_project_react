import './main.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import ItemCard from '../ItemCard/ItemCard';

function Main({ defaultClothingItems, weather, handleCardClick }) {
  return (
    <div className="main">
      <WeatherCard weatherData={weather} />
      <p className="main__weather-info">
        Today is {weather.temperature}°F you may want to wear:{' '}
      </p>
      <ul className="main__item-cards">
        {defaultClothingItems
          .filter((item) => item.weather === weather.weatherType) // Filter by weather type
          .map(
            (
              filteredItem, // Render filtered items
            ) => (
              <li key={filteredItem._id} className="main__item-card">
                <ItemCard
                  data={filteredItem}
                  handleCardClick={handleCardClick}
                />
              </li>
            ),
          )}
      </ul>
    </div>
  );
}

export default Main;
