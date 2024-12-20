import constants from './constants';

const latitude = constants.latitude;
const longitude = constants.longitude;
const apiKey = constants.apiKey;

const describeWeather = (temperature) => {
  if (temperature >= 86) {
    return 'hot';
  } else if (temperature >= 66) {
    return 'warm';
  } else {
    return 'cold';
  }
};

const fetchWeatherData = async () => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`);
    const data = await response.json();
    const cityName = data.name;
    const fahrenheitTemp = data.main.temp;
    const celsiusTemp = Math.round((data.main.temp - 32) * 5/9);
    const weatherType = describeWeather(fahrenheitTemp);
    
    return {
      cityName,
      temperature,
      fahrenheitTemp,
      celsiusTemp,
      weatherType,
    };
};

export default fetchWeatherData;
