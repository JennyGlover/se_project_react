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
  try {
    const response =
      await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}
`);
    const data = await response.json();
    const cityName = data.name;
    const temperature = data.main.temp;
    const weatherType = describeWeather(temperature);

    return {
      cityName,
      temperature,
      weatherType,
    };
  } catch (error) {
    console.log('Error fetching weather data:', error);
    return null;
  }
};

export default fetchWeatherData;
