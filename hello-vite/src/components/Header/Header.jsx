import './Header.css';
import logo from '../../assets/logo.png';
import defaultAvatar from '../../assets/default-avatar.png';

function Header({ handleAddButtonClick, weather }) {
  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="Header">
      <span className="Header__page-info">
        <img src={logo} alt="App Logo" />
        <p className="Header__text">
          {currentDate}, {weather.cityName}
        </p>
      </span>
      <span className="Header__user-info">
        <span className="Header__menu">
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
        <img
          src={defaultAvatar}
          className="Header__avatar"
          alt="User Profile"
        />
      </span>
    </div>
  );
}

export default Header;
