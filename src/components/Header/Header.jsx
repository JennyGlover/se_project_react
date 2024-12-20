import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/logo.png';
import defaultAvatar from '../../assets/default-avatar.png';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

function Header({ handleAddButtonClick, weather }) {
  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  });

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
          <button
            className="Header__button"
            onClick={() => {
              handleAddButtonClick();
            }}
          >
            + Add clothes
          </button>
          <p className="Header__text">Terrence Tegegne</p>
        </span>
        <Link to="/profile">
        <img
          src={defaultAvatar}
          className="Header__avatar"
          alt="User Profile"
        />
        </Link>
      </span>
    </header>
  );
}

export default Header;
