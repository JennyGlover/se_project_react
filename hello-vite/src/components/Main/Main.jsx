import './Main.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import ItemCard from '../ItemCard/ItemCard';

function Main({defaultClothingItems, weatherData, handleCardClick}){

    return(
  <div className="Main">
        <WeatherCard weatherData={weatherData} />
         <p className='Main__weather-info'>Today is 75°F you may want to wear: </p>
         <ul className='Main__item-cards'>
         {defaultClothingItems.map((item)=>{
            return <li key={item._id} className='Main__item-card' ><ItemCard data={item} handleCardClick={handleCardClick}/></li> 
         })}
       </ul>
       
      </div>
    );
}

export default Main;