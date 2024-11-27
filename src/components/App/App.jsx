import './app.css';
import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import ItemModal from '../ItemModal/ItemModal';
import Footer from '../Footer/Footer';
import constants from '../../utils/constants';
import fetchWeatherData from '../../utils/weatherApi';

function App() {
  const defaultClothingItems = constants.defaultClothingItems;
  const [isFormModalVisible, setIsFormModalVisible] = useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const getWeatherData = async () => {
      const data = await fetchWeatherData();
      setWeather(data);
    };

    getWeatherData();
  }, []);

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

  return (
    <div className="app">
      <ModalWithForm
        onClose={onClose}
        isFormModalVisible={isFormModalVisible}
        title="New garment"
        buttonText="Add garment"
        name="add-garment"
      >
        <label htmlFor="mame" className="modalWithForm__input-label">
          Name
        </label>
        <input
          type="text"
          className="modalWithForm__input"
          placeholder="Name"
          id="name"
        />
        <label htmlFor="image" className="modalWithForm__input-label">
          Image
        </label>
        <input
          type="text"
          className="modalWithForm__input"
          placeholder="Image URL"
          id="image"
        />
        <fieldset className="modalWithForm__radio-buttons">
          <legend className="modalWithForm__legend">
            Select the Weather type:
          </legend>
          <label className="modalWithForm__radio" htmlFor="weather-hot">
            <input
              type="radio"
              name="weatherType"
              value="hot"
              id="weather-hot"
              className="modalWithForm__radio-input"
            />
            <span>Hot</span>
          </label>
          <label className="modalWithForm__radio" htmlFor="weather-warm">
            <input
              type="radio"
              name="weatherType"
              value="warm"
              id="weather-warm"
              className="modalWithForm__radio-input"
            />
            <span>Warm</span>
          </label>
          <label className="modalWithForm__radio" htmlFor="weather-cold">
            <input
              type="radio"
              name="weatherType"
              value="cold"
              id="weather-cold"
              className="modalWithForm__radio-input"
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
      <Main
        defaultClothingItems={defaultClothingItems}
        weather={weather || {}}
        handleCardClick={handleCardClick}
        onClose={onClose}
      />
      <Footer />
    </div>
  );
}

export default App;
