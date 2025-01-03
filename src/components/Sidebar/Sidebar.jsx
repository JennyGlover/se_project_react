import { useContext } from 'react';
import defaultAvatar from '../../assets/default-avatar.png';
import './Sidebar.css';
import { CurrentUserContext } from '../../contexts/AppContexts';
import { removeToken } from '../../utils/token';
import { AuthenticationContext } from '../../contexts/AppContexts';

function Sidebar({ handleEditProfileClick }) {
  const { currentUser } = useContext(CurrentUserContext);
  const { setIsLoggedIn } = useContext(AuthenticationContext);

  return (
    <div className="Sidebar">
      <span className="Sidebar__user-info">
        {currentUser.avatar ? (
          <img
            className="Sidebar__avatar"
            src={currentUser.avatar}
            alt="logo"
          />
        ) : (
          <div className="Sidebar__avatar-placeholder">
            {currentUser.name ? (
              <p> {currentUser.name[0].toUpperCase()} </p>
            ) : (
              <img
                src={defaultAvatar}
                className="Sidebar__avatar"
                alt="User Profile"
              />
            )}
          </div>
        )}
        <span className="Sidebar__username">{currentUser?.name}</span>
      </span>
      <p
        className="Sidebar__button"
        onClick={() => {
          handleEditProfileClick();
        }}
      >
        Change Profile data
      </p>
      <p
        className="Sidebar__button"
        onClick={() => {
          removeToken();
          setIsLoggedIn(false);
          window.location.reload();
        }}
      >
        Log out
      </p>
    </div>
  );
}

export default Sidebar;
