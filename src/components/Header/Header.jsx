import { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/logo.png';
import defaultAvatar from '../../assets/default-avatar.png';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { CurrentUserContext } from '../../contexts/AppContexts';
import { AuthenticationContext } from '../../contexts/AppContexts';

function Header({
  handleAddButtonClick,
  handleSignupClick,
  handleLoginClick,
  weather,
}) {
  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  });

  const { currentUser } = useContext(CurrentUserContext);
  const { isLoggedIn } = useContext(AuthenticationContext);

  return (
    <header className="Header">
      <span className="Header__page-info">
        <Link to="/">
          <img src={logo} alt="App Logo" />
        </Link>
        <p className="Header__text">
          {currentDate}, {weather.cityName}
        </p>
      </span>
      <span className="Header__user-info">
        <span className="Header__menu">
          <ToggleSwitch />

          {isLoggedIn && currentUser.name ? (
            <>
              {' '}
              <button
                className="Header__button"
                onClick={() => {
                  handleAddButtonClick();
                }}
              >
                + Add clothes
              </button>{' '}
              <Link to="/profile" className="Header__nav-link">
                <p className="Header__text">{currentUser.name || 'Guest'}</p>
              </Link>
            </>
          ) : (
            <p className="Header__text">
              <button
                className="Header__button"
                onClick={() => {
                  handleSignupClick();
                }}
              >
                Sign Up
              </button>{' '}
              <button
                className="Header__button"
                onClick={() => {
                  handleLoginClick();
                }}
              >
                Log In
              </button>
            </p>
          )}
        </span>

        <div>
          {isLoggedIn && currentUser?.avatar ? (
            <img
              src={currentUser.avatar}
              className="Header__avatar"
              alt="User Profile"
            />
          ) : (
            <div className="Header__avatar-placeholder">
              {isLoggedIn && currentUser.name ? (
                <p> {currentUser.name[0].toUpperCase()} </p>
              ) : (
                <img
                  src={defaultAvatar}
                  className="Header__avatar"
                  alt="User Profile"
                />
              )}
            </div>
          )}
        </div>
      </span>
    </header>
  );
}

export default Header;
