import './Main.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import ItemCard from '../ItemCard/ItemCard';

function Main({ defaultClothingItems, weather, handleCardClick }) {
  return (
    <main className="Main">
      <WeatherCard weatherData={weather} />
      <p className="Main__weather-info">
        Today is {weather.temperatureFahrenheit}°F you may want to wear:{' '}
      </p>
      <ul className="Main__item-cards">
        {defaultClothingItems
          .filter((item) => item.weather === weather.weatherType) // Filter by weather type
          .map(
            (
              filteredItem, // Render filtered items
            ) => (
              <li key={filteredItem._id} className="Main__item-card">
                <ItemCard
                  data={filteredItem}
                  handleCardClick={handleCardClick}
                />
              </li>
            ),
          )}
      </ul>
    </main>
  );
}

export default Main;
