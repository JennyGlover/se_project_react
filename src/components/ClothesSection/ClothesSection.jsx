import { useContext } from 'react';
import './ClothesSection.css';
import ItemCard from '../ItemCard/ItemCard';
import { CurrentUserContext } from '../../contexts/AppContexts';

function ClothesSection({
  clothingItems,
  handleCardClick,
  handleAddButtonClick,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="ClothesSection">
      <span className="ClothesSection__title">Your Items</span>
      <button
        className="ClothesSection__add-new-btn"
        onClick={() => {
          handleAddButtonClick();
        }}
      >
        + Add new
      </button>
      <div className="ClothesSection__item-cards">
        {clothingItems
          .filter((item) => item.owner._id === currentUser._id)
          .map((item) => (
            <li key={item._id} className="ClothesSection__item-card">
              <ItemCard data={item} handleCardClick={handleCardClick} />
            </li>
          ))}
      </div>
    </div>
  );
}

export default ClothesSection;
