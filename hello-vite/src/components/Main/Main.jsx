import './Main.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import ItemCard from '../ItemCard/ItemCard';

function Main(){

    return(
  <div className="Main">
        <WeatherCard />
         <p className='Main__weather-info'>Today is 75°F you may want to wear: </p>
        <ItemCard/>
      </div>
    );
}

export default Main;