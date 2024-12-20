import './App.css';
import { useState, useEffect, useContext } from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import ItemModal from '../ItemModal/ItemModal';
import Footer from '../Footer/Footer';
import constants from '../../utils/constants';
import fetchWeatherData from '../../utils/weatherApi';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';

function App() {
  const defaultClothingItems = constants.defaultClothingItems;
  const [isFormModalVisible, setIsFormModalVisible] = useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [weather, setWeather] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");



  const handleCardClick = (item) => {
    setSelectedItem(item);
    setIsImageModalVisible((prevState) => !prevState);
  };

  const handleAddButtonClick = () => {
    setIsFormModalVisible((prevState) => !prevState);
  };

  const onClose = () => {
    setIsImageModalVisible(false);
    setIsFormModalVisible(false);
    setSelectedItem(null);
  };

  const handleToggleSwitchChange = ()=> {
 currentTemperatureUnit === 'C'
 ? setCurrentTemperatureUnit('F')
 : setCurrentTemperatureUnit('C')  
  };

    useEffect(() => {
    const getWeatherData = async () => {
      try {
          const data = await fetchWeatherData();
          setWeather(data);
      } catch(error){
        console.error("Failed to fetch weather data:", error);
      }
    
    };

    getWeatherData();
  }, []);

  return (
    <div className="App">
      <CurrentTemperatureUnitContext.Provider value={{currentTemperatureUnit, handleToggleSwitchChange}}>
      <ModalWithForm
        onClose={onClose}
        isFormModalVisible={isFormModalVisible}
        title="New garment"
        buttonText="Add garment"
        name="add-garment"
      >
        <label htmlFor="mame" className="ModalWithForm__input-label">
          Name
        </label>
        <input
          type="text"
          className="ModalWithForm__input"
          placeholder="Name"
          id="name"
        />
        <label htmlFor="image" className="ModalWithForm__input-label">
          Image
        </label>
        <input
          type="text"
          className="ModalWithForm__input"
          placeholder="Image URL"
          id="image"
        />
        <fieldset className="ModalWithForm__radio-buttons">
          <legend className="ModalWithForm__legend">
            Select the Weather type:
          </legend>
          <label className="ModalWithForm__radio" htmlFor="weather-hot">
            <input
              type="radio"
              name="weatherType"
              value="hot"
              id="weather-hot"
              className="ModalWithForm__radio-input"
            />
            <span>Hot</span>
          </label>
          <label className="ModalWithForm__radio" htmlFor="weather-warm">
            <input
              type="radio"
              name="weatherType"
              value="warm"
              id="weather-warm"
              className="ModalWithForm__radio-input"
            />
            <span>Warm</span>
          </label>
          <label className="ModalWithForm__radio" htmlFor="weather-cold">
            <input
              type="radio"
              name="weatherType"
              value="cold"
              id="weather-cold"
              className="ModalWithForm__radio-input"
            />
            <span>Cold</span>
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        onClose={onClose}
        isImageModalVisible={isImageModalVisible}
        data={selectedItem}
      />
      <Header
        handleAddButtonClick={handleAddButtonClick}
        weather={weather || {}}
      />
      <Profile  defaultClothingItems={defaultClothingItems}
              handleCardClick={handleCardClick}
        handleAddButtonClick={handleAddButtonClick}

/>
      {/* <Main
        defaultClothingItems={defaultClothingItems}
        weather={weather || {}}
        handleCardClick={handleCardClick}
        onClose={onClose}
      /> */}
      <Footer />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
