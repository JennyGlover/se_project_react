import { useContext } from "react";
import {Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/logo.png';
import defaultAvatar from '../../assets/default-avatar.png';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { CurrentUserContext } from '../../contexts/AppContexts';

function Header({ handleAddButtonClick, handleSignupClick, handleLoginClick, weather, setIsLoginModalVisible}) {
  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  });
  
const {currentUser}  = useContext(CurrentUserContext);
const navigate = useNavigate();
  return (
    <header className="Header">
      <span className="Header__page-info">
        <Link to="/" >
        <img src={logo} alt="App Logo" />  
        </Link>
        <p className="Header__text">
          {currentDate}, {weather.cityName}
        </p>
      </span>
      <span className="Header__user-info">
        <span className="Header__menu">
          <ToggleSwitch />
         
          { currentUser.name? ( <>  <button
            className="Header__button"
            onClick={() => {
              handleAddButtonClick();
            }}
            
          >
            + Add clothes
          </button> <p className="Header__text">{currentUser.name || "Guest"}</p></>) : ( <p className="Header__text"><button className="Header__button"  onClick={() => {
              handleSignupClick();
            }}>Sign Up</button> <button className="Header__button"  onClick={() => {
              handleLoginClick();
            }}>Log In</button></p>)}
        </span>

        <div onClick={() => {
          if(currentUser.name){
            navigate("/profile");
          }else{
           setIsLoginModalVisible(true)
          }
          
        } }
        className="Header__link">
        {currentUser?.avatar? ( <img
          src={currentUser.avatar}
          className="Header__avatar"
          alt="User Profile"
        />)  : (<div className="Header__avatar-placeholder">{ currentUser.name ? (<p> {currentUser.name[0].toUpperCase()} </p>) : (<img
          src={defaultAvatar}
          className="Header__avatar"
          alt="User Profile"
        />)}</div>)} 
        </div>
      </span>
    </header>
  );
}

export default Header;
