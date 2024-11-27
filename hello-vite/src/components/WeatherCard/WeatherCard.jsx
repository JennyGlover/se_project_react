import './WeatherCard.css';
import cloudy from "../../assets/cloudy.svg"

function WeatherCard({weatherData}){

    return(
   <div className="WeatherCard" >
        <p className='WeatherCard__text'>75°F</p>
        <img  className='WeatherCard__image' src={cloudy} alt="cloudy" />
      </div>
    );
}

export default WeatherCard;