import './Header.css';
import logo from '../../assets/logo.png';
import defaultAvatar from '../../assets/default-avatar.png'

function Header(){
    const currentDate = new Date().toLocaleString('default', {month: 'long', day: 'numeric'});

    return (
      <div className="Header">
        <span className='header__page-info'>
        <img src={logo} alt="App Logo" />
        <p className="header__text">{currentDate}, New York</p>
        </span>
        <span className='header__user-info'>
        <span className='header__menu'>
        <button className="header__button">+ Add clothes</button>
        <p className="header__text">Terrence Tegegne</p>
        </span>
        <img src={defaultAvatar} className="header__avatar" alt="User Profile"/>
        </span>
      </div>
    );
}

export default Header;