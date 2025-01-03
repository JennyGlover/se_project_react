import './App.css';
import { useState, useEffect} from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';
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
import EditProfileModal from '../EditProfileModal/EditProfileModal';

function App() {
  const [isAddItemModalVisible, setIsAddItemModalVisible] = useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [isSignupModalVisible, setIsSignupModalVisible] = useState(false);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isEditProfileModalVisible, setIsEditProfileModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [weather, setWeather] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name:"", avatar: "" });
 
  const handleCardClick = (item, e) => {
    setSelectedItem(item);
    setIsImageModalVisible((prevState) => !prevState);
    e.stopPropagation();
  };

  const handleAddButtonClick = () => {
    setIsAddItemModalVisible((prevState) => !prevState);
  };

  const handleSignupClick = () => {
    setIsSignupModalVisible((prevState) => !prevState);
  }

    const handleLoginClick = () => {
    setIsLoginModalVisible((prevState) => !prevState);
      }
    
    const handleEditProfileClick = () => {
      setIsEditProfileModalVisible((prevState) => !prevState);
    }


  const handleCloseModal = () => {
    setIsImageModalVisible(false);
    setIsAddItemModalVisible(false);
    setIsSignupModalVisible(false);
    setIsLoginModalVisible(false);
    setIsEditProfileModalVisible(false);
    setSelectedItem(null);
  };

  const handleToggleSwitchChange = ()=> {
 currentTemperatureUnit === 'F'
 ? setCurrentTemperatureUnit('C')
 : setCurrentTemperatureUnit('F')  
  };

const handleAddItemSubmit = (item) =>{
   const jwt = getToken();

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

const handleCardLike = ({ _id , likes}) => {
  const jwt = getToken();
  if (!jwt) {
    return;
  }

  const isLiked = likes?.includes(currentUser._id);

  // Check if this card is not currently liked
 !isLiked 
 ? // if so, send a request to add the user's id to the card's likes array
 api
   .addCardLike(jwt, _id)
   .then((res) => {
    setClothingItems((cards) =>
      cards.map((item) => item._id === _id ? res.data : item
  ))
   })
  .catch(console.error)
 :
 api
  .removeCardLike(jwt, _id)
  .then((res) => {
    setClothingItems((cards) => 
       cards.map((item) => item._id === _id ? res.data : item )
    )
  })
  .catch(console.error);
}

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
      
      handleCloseModal();
    })
    .catch(console.error);
};


const handleLogin = ({
  email,
  password,
}) => {
  auth
  .signin(email, password)
  .then((data) => {
    setToken(data);
    setIsLoading(true);
    setIsLoggedIn(true);
    
  //redirecting users to the original desired route
    handleCloseModal();
    window.location.reload();
  });
};

const handleEditProfile = (item) => {
    const jwt = getToken();

   if (!jwt) {
    return;
  }
  
   api
    .updateUserProfile(jwt, item)
    .then((res) => {
      const { name, avatar } = res.data;
      setCurrentUser({name, avatar})
      handleCloseModal();
    })
    .catch(console.error);
}


useEffect(() => {
 const jwt = getToken();

  if (!jwt) {
    return;
  }

  auth
   .getUserInfo(jwt)
   .then((res) => {
    const { name, avatar, _id } = res.data;
    setCurrentUser({ name, avatar, _id});   
    setIsLoggedIn(true);
   })
    .catch(console.error);
}, [
]);

const handleItemDelete = (id) => {
   const jwt = getToken();
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
      }
    
    };

    getWeatherData();
  }, []);

    useEffect(() => {
      api
      .getItems()
       .then((items) =>{
      
      let clothingItems = items.data
      const filteredData = clothingItems.filter((item) => item.name && item.imageUrl); 
      // Validate data
      setClothingItems(filteredData);
       }).catch(console.error);

  }, []);




  return (
    <div className="App">
      <AuthenticationContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <CurrentTemperatureUnitContext.Provider value={{currentTemperatureUnit, handleToggleSwitchChange}}>
      <AddItemModal handleCloseModal={handleCloseModal} isAddItemModalVisible={isAddItemModalVisible} handleAddItemSubmit={handleAddItemSubmit} isLoading={isLoading}/>
      <RegisterModal handleCloseModal={handleCloseModal} isSignupModalVisible={isSignupModalVisible} setIsLoginModalVisible={setIsLoginModalVisible} handleRegistration={handleRegistration} isLoading={isLoading} />
      <LoginModal handleCloseModal={handleCloseModal} isLoginModalVisible={isLoginModalVisible} setIsSignupModalVisible={setIsSignupModalVisible} handleLogin={handleLogin} isLoading={isLoading}/>
      <EditProfileModal handleCloseModal={handleCloseModal} isEditProfileModalVisible={isEditProfileModalVisible} setIsEditProfileModalVisible={setIsEditProfileModalVisible} handleEditProfile={handleEditProfile} isLoading={isLoading}/>
      <ItemModal
       handleCloseModal={handleCloseModal}
        isImageModalVisible={isImageModalVisible}
        data={selectedItem}
        handleItemDelete={handleItemDelete}
      />
      <Header
        handleAddButtonClick={handleAddButtonClick}
        handleLoginClick={handleLoginClick}
        handleSignupClick={handleSignupClick}
        weather={weather || {}}
        setIsLoginModalVisible={setIsLoginModalVisible}
      />
      <Routes>
      <Route path="/" element={ 
        <ProtectedRoute anonymous>
        <Main
        clothingItems={clothingItems}
        weather={weather || {}}
        handleCardClick={handleCardClick}
        handleCloseModal={handleCloseModal}
        onCardLike={handleCardLike}
      />
      </ProtectedRoute>
    } />
        <Route path="/profile" element={
         <ProtectedRoute>
          <Profile  clothingItems={clothingItems}
          handleCardClick={handleCardClick}
        handleAddButtonClick={handleAddButtonClick}
        handleEditProfileClick={handleEditProfileClick}
    />       
      </ProtectedRoute>
} />
      <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
      <Footer />
      </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
      </AuthenticationContext.Provider>
    </div>
  );
}

export default App;
