import './App.css';
import { useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import ItemModal from '../ItemModal/ItemModal';
import AddItemModal from '../AddItemModal/AddItemModal';
import Footer from '../Footer/Footer';
import constants from '../../utils/constants';
import fetchWeatherData from '../../utils/weatherApi';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import { deleteItem, getItems, postItem } from '../../utils/api';

function App() {
  const [isFormModalVisible, setIsFormModalVisible] = useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [weather, setWeather] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);


  const handleCardClick = (item) => {
    setSelectedItem(item);
    setIsImageModalVisible((prevState) => !prevState);
  };

  const handleAddButtonClick = () => {
    setIsFormModalVisible((prevState) => !prevState);
  };

  const handleCloseModal = () => {
    setIsImageModalVisible(false);
    setIsFormModalVisible(false);
    setSelectedItem(null);
  };

  const handleToggleSwitchChange = ()=> {
 currentTemperatureUnit === 'C'
 ? setCurrentTemperatureUnit('F')
 : setCurrentTemperatureUnit('C')  
  };

// const onAddItem = (values) => {
//   console.log(values)
// }

const handleAddItemSubmit = (item) =>{
   postItem(item)
    .then((newItem) => {
      setClothingItems([newItem, ...clothingItems]);
    }).catch(console.error);
}

const handleItemDelete = (id) => {
   deleteItem(id)
   .then(() => {
    setClothingItems((prevItems) => prevItems.filter(item => item._id !== id))
    setIsImageModalVisible(false);
   }).catch(console.error);
}


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

    useEffect(() => {
      getItems()
       .then((data) =>{
      const filteredData = data.filter((item) => item.name && item.link); // Validate data
      setClothingItems(filteredData);
       }).catch(console.error);

  }, []);



  return (
    <div className="App">
      <CurrentTemperatureUnitContext.Provider value={{currentTemperatureUnit, handleToggleSwitchChange}}>
      <AddItemModal handleCloseModal={handleCloseModal} isFormModalVisible={isFormModalVisible} handleAddItemSubmit={handleAddItemSubmit}/>
      <ItemModal
       handleCloseModal={handleCloseModal}
        isImageModalVisible={isImageModalVisible}
        data={selectedItem}
        handleItemDelete={handleItemDelete}
      />
      <Header
        handleAddButtonClick={handleAddButtonClick}
        weather={weather || {}}
      />
      <Routes>
        <Route path="/" element={   <Main
        clothingItems={clothingItems}
        weather={weather || {}}
        handleCardClick={handleCardClick}
        handleCloseModal={handleCloseModal}
      />} />
        <Route path="/profile" element={  <Profile  clothingItems={clothingItems}
              handleCardClick={handleCardClick}
        handleAddButtonClick={handleAddButtonClick}


/>} />
      </Routes>
  
      <Footer />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
