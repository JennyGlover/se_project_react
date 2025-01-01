import './App.css';
import { useState, useEffect} from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation} from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import ItemModal from '../ItemModal/ItemModal';
import AddItemModal from '../AddItemModal/AddItemModal';
import LoginModal from '../LoginModal/LoginModal';
import Footer from '../Footer/Footer';
import fetchWeatherData from '../../utils/weatherApi';
import { CurrentTemperatureUnitContext, AuthenticationContext, CurrentUserContext } from '../../contexts/AppContexts';
import * as api from '../../utils/api';
import RegisterModal from '../RegisterModal/RegisterModal';
import ProtectedRoute from '../ProtectedRoute';
import * as auth from '../../utils/auth';
import { setToken, getToken } from '../../utils/token';

function App() {
  const [isFormModalVisible, setIsFormModalVisible] = useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [weather, setWeather] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const jwt = getToken();
  const navigate = useNavigate();
  const location = useLocation();

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
 currentTemperatureUnit === 'F'
 ? setCurrentTemperatureUnit('C')
 : setCurrentTemperatureUnit('F')  
  };

const handleAddItemSubmit = (item) =>{
   if (!jwt) {
    return;
  }
  
  setIsLoading(true);
  api
    .postItem(jwt, item)
    .then((newItem) => {
      setClothingItems([newItem, ...clothingItems]);
      handleCloseModal();
    }).catch(console.error)
    .finally(() => {
      setIsLoading(false);
    });
};

const handleLogin = ({
  email,
  password,
}) => {
  auth
  .signin(email, password)
  .then((data) => {
    setToken(data.jwt);
    setIsLoading(true);
    setIsLoggedIn(true);

  //redirecting users to the original desired route
  const redirectPath = location.state?.from?.pathname || "/";
  navigate(redirectPath);
  
  });
};

useEffect(() => {
  if (!jwt) {
    return;
  }

  auth
   .getUserInfo(jwt)
   .then(() => {
    setIsLoggedIn(true);
   })
   .catch(console.error);

}, []);


const handleRegistration = ({
  email,
  password,
  name,
  avatar,
}) =>{

  auth
    .signup(email, password, name, avatar)
    .then(() =>{
      //Navigate to login
      navigate("/signup")
    })
    .catch(console.error);
  setIsLoading(true);
};




const handleItemDelete = (id) => {
     if (!jwt) {
    return;
  }
  api
   .deleteItem(jwt, id)
   .then(() => {
    setClothingItems((prevItems) => prevItems.filter(item => item._id !== id))
    handleCloseModal();
   }).catch(console.error);
};

    useEffect(() => {
    const getWeatherData = async () => {
      try {
          const data = await fetchWeatherData();
          setWeather(data);
      } catch(error){
        console.error("Failed to fetch weather data:", error);
      };
    
    };

    getWeatherData();
  }, []);

    useEffect(() => {
      api
      .getItems()
       .then((data) =>{
      const filteredData = data.filter((item) => item.name && item.link); // Validate data
      setClothingItems(filteredData);
       }).catch(console.error);

  }, []);




  return (
    <div className="App">
      <AuthenticationContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider value={{currentTemperatureUnit, handleToggleSwitchChange}}>
      <AddItemModal handleCloseModal={handleCloseModal} isFormModalVisible={isFormModalVisible} handleAddItemSubmit={handleAddItemSubmit} isLoading={isLoading}/>
      <LoginModal handleCloseModal={handleCloseModal} isFormModalVisible={isFormModalVisible} handleLogin={handleLogin} isLoading={isLoading}/>
      <RegisterModal handleCloseModal={handleCloseModal} isFormModalVisible={isFormModalVisible} handleRegistration={handleRegistration} isLoading={isLoading}/>
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
        <Route path="/" element={ 
        <ProtectedRoute>
        <Main
        clothingItems={clothingItems}
        weather={weather || {}}
        handleCardClick={handleCardClick}
        handleCloseModal={handleCloseModal}
      />
      </ProtectedRoute>
    } />
        <Route path="/profile" element={
         <ProtectedRoute>
          <Profile  clothingItems={clothingItems}
              handleCardClick={handleCardClick}
        handleAddButtonClick={handleAddButtonClick}
    />       
      </ProtectedRoute>
} />
      
      </Routes>
  
      <Footer />
      </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
      </AuthenticationContext.Provider>
    </div>
  );
}

export default App;
