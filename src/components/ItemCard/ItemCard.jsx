import { useEffect, useState, useContext } from 'react';
import {
  AuthenticationContext,
  CurrentUserContext,
} from '../../contexts/AppContexts';
import './ItemCard.css';

function ItemCard({ data, handleCardClick, onCardLike }) {
  const [likes, setLikes] = useState(data.likes || []);
  const { isLoggedIn } = useContext(AuthenticationContext);
  const { currentUser } = useContext(CurrentUserContext);
  useEffect(() => {
    if (data.likes) {
      setLikes(data.likes);
    }
  }, [data]);

  const handleLike = (data, e) => {
    e.stopPropagation();
    onCardLike(data);
  };

  const isLiked = likes?.includes(currentUser._id) || false;
  const itemLikeButtonClassName = `ItemCard__${!isLiked ? 'unlikedHeart' : 'likedHeart'}`;

  return (
    <div
      className="ItemCard"
      onClick={(e) => {
        handleCardClick(data, e);
      }}
    >
      <div className="ItemCard__top-content">
        <p className="ItemCard__title">{data.name}</p>{' '}
        {
          <div
            onClick={(e) => handleLike(data, e)}
            className={isLoggedIn ? itemLikeButtonClassName : ''}
          >
            {' '}
          </div>
        }{' '}
      </div>
      <div className="ItemCard__item-container">
        <img src={data.imageUrl} className="ItemCard__item" alt={data.name} />
      </div>
    </div>
  );
}

export default ItemCard;
