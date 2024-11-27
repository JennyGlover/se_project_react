import './App.css';
import { useState } from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import ItemModal from '../ItemModal/ItemModal';
import Footer from '../Footer/Footer';
import utils from '../../utils/utils';


function App(){
    const defaultClothingItems = utils.defaultClothingItems;
    const weatherData = utils.weatherData;
    
    const [isFormModalVisible, setIsFormModalVisible] = useState(false);
    const [isImageModalVisible, setIsImageModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);


    const handleCardClick = (item) =>{
       setSelectedItem(item);
       setIsImageModalVisible(prevState => !prevState);
    
    }

     const handleAddButtonClick = () =>{
       setIsFormModalVisible(prevState => !prevState);
    
    }
    


    const onClose = () =>{
        setIsImageModalVisible(false);
        setIsFormModalVisible(false);
        setSelectedItem(null);
    }
    
    return (
      <div className="App">
        <ModalWithForm onClose={onClose} isFormModalVisible={isFormModalVisible} />
        <ItemModal onClose={onClose} isImageModalVisible={isImageModalVisible} data={selectedItem} />
        <Header handleAddButtonClick={handleAddButtonClick}/>
        <Main defaultClothingItems={defaultClothingItems} weatherData={weatherData} handleCardClick={handleCardClick} onClose={onClose}/> 
        <Footer />
      </div>
    );
}

export default App;