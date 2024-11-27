import './header.css';
import logo from '../../assets/logo.png';
import defaultAvatar from '../../assets/default-avatar.png';

function Header({ handleAddButtonClick, weather }) {
  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="header">
      <span className="header__page-info">
        <img src={logo} alt="App Logo" />
        <p className="header__text">
          {currentDate}, {weather.cityName}
        </p>
      </span>
      <span className="header__user-info">
        <span className="header__menu">
          <button
            className="header__button"
            onClick={() => {
              handleAddButtonClick();
            }}
          >
            + Add clothes
          </button>
          <p className="header__text">Terrence Tegegne</p>
        </span>
        <img
          src={defaultAvatar}
          className="header__avatar"
          alt="User Profile"
        />
      </span>
    </div>
  );
}

export default Header;
